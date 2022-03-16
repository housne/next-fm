import { FunctionComponent, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import { Radio } from "../../lib/source";
import { PlayerProviderContext } from "./context";
import Hls from 'hls.js'
import { PlayState } from "../../types/player";
import { LoopMode, PlayerComponent } from "./components/player";

export const PlayerProvider: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {

  const audioRef = useRef<HTMLAudioElement>()
  const lastPlayedRadio = useRef<Radio>()
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

  const play = useCallback((radio?: Radio) => {
    const audio = audioRef.current
    if (!audio) {
      return Promise.reject()
    }
    setPlayState('not_started')
    if (!radio) {
      return audio.play()
    }
    if (lastPlayedRadio.current?.slug === radio.slug) {
      return audio.play()
    }
    if (lastPlayedRadio.current?.hls) {
      hlsRef.current && hlsRef.current.destroy()
    }
    if (!radio.hls) {
      audio.src = radio.stream_url
    }
    lastPlayedRadio.current = radio
    setPlayingRadio(radio)
    audio.load()
    if (!radio.hls) {
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
  }, [])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) {
      return Promise.reject()
    }
    audio.pause()
  }, [])

  const getPlayState = useCallback<(radio: Radio) => PlayState>((radio: Radio) => {
    const audio = audioRef.current
    if (!audio) {
      return 'not_started'
    }
    if (playingRadio?.slug !== radio.slug) {
      return 'not_started'
    }
    return playState
  }, [playState, playingRadio])

  const onNext = useCallback(() => {}, [])

  const onPrev = useCallback(() => {}, [])

  const onRandomChange = (random: boolean) => randomRef.current = random
  
  const onLoopModeChange = (loopMode: LoopMode) => loopModeRef.current = loopMode

  return (
    <PlayerProviderContext.Provider value={{ play, pause, getPlayState }}>
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
      />
    </PlayerProviderContext.Provider>
  )
}