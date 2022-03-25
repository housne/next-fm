import { FunctionComponent, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import { Radio } from "../../types/radio";
import { PlayerProviderContext } from "./context";
import Hls from 'hls.js'
import { PlayState } from "../../types/player";
import { LoopMode, PlayerComponent } from "./components/player";

export const PlayerProvider: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {

  const audioRef = useRef<HTMLAudioElement>()
  const lastPlayedRadioRef = useRef<Radio>()
  const [playlist, setPlaylist] = useState<Radio[]>([])
  const [playState, setPlayState] = useState<PlayState>('not_started')
  const randomRef = useRef(false)
  const loopModeRef = useRef<LoopMode>('none')
  const [playingRadio, setPlayingRadio] = useState<Radio>()
  const hlsRef = useRef<Hls>()

  useEffect(() => {
    audioRef.current = new Audio()
    const stateChangeHandler = (state: PlayState) => setPlayState(state)
    const onAbort = () => stateChangeHandler('loading')
    const onWaiting = () => stateChangeHandler('loading')
    const onPlay = () => stateChangeHandler('playing')
    const onPause = () => stateChangeHandler('paused')
    const onError = () => stateChangeHandler('error')
    const audio = audioRef.current
    audio.addEventListener('abort', onAbort)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)
    audio.addEventListener('playing', onPlay)

    return () => {
      audio.removeEventListener('abort', onAbort)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('playing', onPlay)
    }
  }, [])

  const addToPlayList = useCallback((radio: Radio, prepend = false) => {
    setPlaylist(list => {
      if (list.find(l => l.id === radio.id)) {
        return list
      }
      if (prepend) {
        return [radio].concat(list)
      }
      return list.concat(radio)
    })
  }, [])

  const play = useCallback((radio?: Radio) => {
    const audio = audioRef.current
    if (!audio) {
      return Promise.reject()
    }
    setPlayState('not_started')
    if (!radio) {
      return audio.play()
    }
    if (lastPlayedRadioRef.current?.id === radio.id) {
      return audio.play()
    }
    if (lastPlayedRadioRef.current?.is_hls) {
      hlsRef.current && hlsRef.current.destroy()
    }
    if (!radio.is_hls) {
      audio.src = radio.stream_url
    }
    lastPlayedRadioRef.current = radio
    setPlayingRadio(radio)
    addToPlayList(radio, true)
    audio.load()
    if (radio.is_hls) {
      if (audio.canPlayType('application/vnd.apple.mpegurl')) {
        audio.src = radio.stream_url
        return audio.play()
      }
      return new Promise<void>((resolve, reject) => {
        hlsRef.current = new Hls()
        hlsRef.current.attachMedia(audio)
        hlsRef.current.on(Hls.Events.MEDIA_ATTACHED, () => {
          hlsRef.current?.loadSource(radio.stream_url)
          audio.play().then(resolve).catch(reject)
        })
      })
    }
    return audio.play()
  }, [addToPlayList])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) {
      return Promise.reject()
    }
    audio.pause()
  }, [])

  const getPlayState = useCallback<(radio?: Radio) => PlayState>((radio?: Radio) => {
    const audio = audioRef.current
    if (!audio || !radio) {
      return 'not_started'
    }
    if (playingRadio?.id !== radio.id) {
      return 'not_started'
    }
    return playState
  }, [playState, playingRadio])

  const onNext = useCallback(() => {}, [])

  const onPrev = useCallback(() => {}, [])

  const onRandomChange = (random: boolean) => randomRef.current = random
  
  const onLoopModeChange = (loopMode: LoopMode) => loopModeRef.current = loopMode

  const removeItemFromPlaylist = useCallback((radio: Radio) => {
    setPlaylist(list => list.filter(r => r.id !== radio.id))
  }, [])

  const clearPlaylist = useCallback(() => {
    setPlaylist(list => list.filter(r => r.id === lastPlayedRadioRef.current?.id))
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) {
      return
    }
    const nextHandle = () => {
      const loopMode = loopModeRef.current
      const random = randomRef.current
      const lastPlayedRadio = lastPlayedRadioRef.current
      const currentPlayIndex = !lastPlayedRadio ? -1 : playlist.findIndex(r => r.id === lastPlayedRadio.id)
      const isLastRadio = currentPlayIndex === playlist.length - 1
      if (loopMode === 'one') {
        const audio = audioRef.current
        if (!audio) {
          return Promise.reject()
        }
        audio.load()
        play()
      } else if (random) {
        const randomIndex = Math.ceil(Math.random() * playlist.length)
        const randomRadio = playlist[randomIndex]
        play(randomRadio)
      } else if (loopMode === 'list' && isLastRadio) {
        play(playlist[0])
      } else {
        if (isLastRadio) {
          return
        }
        play(playlist[currentPlayIndex + 1])
      }
    }
    audio.addEventListener('ended', nextHandle)

    return () => {
      audio.removeEventListener('ended', nextHandle)
    }
  }, [play, playlist])

  useEffect(() => {
    const playlistFromLocal = localStorage.getItem('playlist')
    if (!playlistFromLocal) {
      return
    }
    try {
      const playlist = JSON.parse(playlistFromLocal)
      setPlaylist(playlist)
    } catch (e) {}
  }, [])

  useEffect(() => {
    const radioFromLocal = localStorage.getItem('playingRadio')
    if (!radioFromLocal) {
      return
    }
    try {
      const radio = JSON.parse(radioFromLocal)
      setPlayingRadio(radio)
    } catch (e) {}
  }, [])

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist))
  }, [playlist])

  useEffect(() => {
    localStorage.setItem('playingRadio', JSON.stringify(playingRadio))
  }, [playingRadio])

  return (
    <PlayerProviderContext.Provider value={{ play, pause, getPlayState, audio: audioRef.current, addToPlayList }}>
      { children }
      <PlayerComponent 
        playlist={playlist} 
        playState={playState} 
        playingRadio={playingRadio}
        pause={pause}
        play={play}
        onNext={onNext}
        onPrev={onPrev}
        onLoopModeChange={onLoopModeChange}
        onRandomChange={onRandomChange}
        removeItemFromPlaylist={removeItemFromPlaylist}
        clearPlaylist={clearPlaylist}
      />
    </PlayerProviderContext.Provider>
  )
}