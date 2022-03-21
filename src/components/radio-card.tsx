import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent, PropsWithChildren } from 'react'
import { PlayButton } from '../components/play-button'
import { PlayingIcon } from '../components/playing-icon'
import { usePlayer } from '../context/player'
import type { Radio, Genre } from '../types/radio'

type RadioComponentProps = {
  radio: Radio
  isGrid?: boolean
}

const RadioPlayerComponent: FunctionComponent<PropsWithChildren<RadioComponentProps>> = ({ radio, children }) => {
  const { getPlayState } = usePlayer()
  const playState = getPlayState(radio)
  return (
    <div className="relative w-full group">
      { children }
      <div className={classNames("group-hover:block", playState === 'paused' || playState === 'not_started' ? 'hidden' : 'block')}>
        <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-10 rounded-md" />
        {playState === 'playing' && <span className="absolute top-2 left-2"><PlayingIcon /></span>}
        <PlayButton 
          className="absolute bottom-4 flex items-center text-xl text-white justify-center right-4 w-[28px] h-[28px] bg-black/10 backdrop-blur-md rounded-full hover:bg-red-500"
          radio={radio}
          loading={{size: 28, secondaryColor: 'transparent'}}
        />
      </div>
    </div>
  )
}

export const GenreLink: FunctionComponent<{genre: Genre, className?: string}> = ({ genre, className }) => {
  return (
    <Link href={`/genre/${genre.id}`} passHref>
      <a className={className}>{genre.name}</a>
    </Link>
  )
}

export const FeatureRadioComponent: FunctionComponent<RadioComponentProps> = ({ radio, isGrid }) => {
  const router = useRouter()
  const gotoRadio = () => router.push(`/radio/${radio.id}`)
  return (
    <div className="mr-6 my-4 flex-shrink-0 cursor-pointer" style={{width: isGrid ? "100%" : "calc(100% / 3  - 1rem)"}}>
      <div className="text-sm text-gray-500">
        {
          radio.genres.map(g => <GenreLink genre={g.genre} key={g.genre.id} />)
        }
      </div>
      <div>{radio.name}</div>
      <div onClick={gotoRadio}>
        <RadioPlayerComponent radio={radio}>
          <div className="aspect-w-16 aspect-h-9 relative mt-2 rounded-md border w-full" >
            <Image src={radio.thumbnail} alt={radio.name} layout="fill" objectFit="cover" className="rounded-md" />
          </div>
        </RadioPlayerComponent>
      </div>
    </div>
  )
}

export const RadioComponent: FunctionComponent<RadioComponentProps> = ({radio, isGrid}) => {
  const router = useRouter()
  const gotoRadio = () => router.push(`/radio/${radio.id}`)
  return (
    <div className="mr-6 my-2 flex-shrink-0 cursor-pointer" style={{width: isGrid ? "100%" : "calc(100% / 5  - 1rem)"}} onClick={gotoRadio}>
      <RadioPlayerComponent radio={radio}>
        <div className="aspect-w-1 aspect-h-1 relative rounded-md border shadow-sm w-full">
          <Image src={radio.thumbnail} alt={radio.name} layout="fill" objectFit="cover" className="rounded-md" />
        </div>
      </RadioPlayerComponent>
      <div className="mt-2 text-sm">{radio.name}</div>
    </div>
  )
}