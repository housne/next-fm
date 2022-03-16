import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FunctionComponent, MouseEventHandler, PropsWithChildren } from 'react'
import { SpinnerRoundFilled } from 'spinners-react'
import { PlayStateIcon } from '../components/play-state-icon'
import { PlayingIcon } from '../components/playing-icon'
import { usePlayer } from '../context/player'
import { getFeaturedRadios, getRadioByGenre, Radio } from '../lib/source'

const RadioPlayerComponent: FunctionComponent<PropsWithChildren<RadioComponentProps>> = ({ radio, children }) => {
  const { play, pause, getPlayState } = usePlayer()
  const playState = getPlayState(radio)
  const playRadio: MouseEventHandler = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (playState === 'playing' || playState === 'loading') {
      pause()
    } else {
      play(radio)
    }
  }
  return (
    <div className="relative w-full">
      { children }
      <div className="" />
      {playState === 'playing' && <span className="absolute top-2 left-2"><PlayingIcon /></span>}
      <button 
        onClick={playRadio}
        className="absolute bottom-4 flex items-center text-xl text-white justify-center right-4 w-[28px] h-[28px] bg-black/10 backdrop-blur-md rounded-full"
      >
        <PlayStateIcon state={playState} loading={{size: 28, secondaryColor: 'transparent'}} />
      </button>
    </div>
  )
}

type RadioComponentProps = {
  radio: Radio
}

const FeatureRadioComponent: FunctionComponent<RadioComponentProps> = ({ radio }) => {
  const router = useRouter()
  const gotoRadio = () => router.push(`/radio/${radio.slug}`)
  return (
    <div className="mr-6 my-4 flex-shrink-0 cursor-pointer" style={{width: "calc(100% / 3  - 1rem)"}} onClick={gotoRadio}>
      <div className="text-sm text-gray-500">{radio.genre.map(g => g.label).join('&')}</div>
      <div>{radio.name}</div>
      <RadioPlayerComponent radio={radio}>
        <div className="aspect-w-16 aspect-h-9 relative mt-2 rounded-md shadow-lg w-full"  >
          <Image src={radio.thumbnail} alt={radio.name} layout="fill" objectFit="cover" className="rounded-md" />
        </div>
      </RadioPlayerComponent>
    </div>
  )
}

const RadioComponent: FunctionComponent<RadioComponentProps> = ({radio}) => {
  const router = useRouter()
  const gotoRadio = () => router.push(`/radio/${radio.slug}`)
  return (
    <div className="mr-6 my-2 flex-shrink-0 cursor-pointer" style={{width: "calc(100% / 5  - 1rem)"}} onClick={gotoRadio}>
      <RadioPlayerComponent radio={radio}>
        <div className="aspect-w-1 aspect-h-1 relative rounded-md border w-full">
          <Image src={radio.thumbnail} alt={radio.name} layout="fill" objectFit="cover" className="rounded-md" />
        </div>
      </RadioPlayerComponent>
      <div className="mt-2 text-sm">{radio.name}</div>
    </div>
  )
}

const GridList: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="w-full">
      <div className="overflow-auto flex flex-nowrap">
        {
          children
        }
      </div>
    </div>
  )
}

type HomeProps = {
  featuredRadios: Radio[]
  musicRadios: Radio[]
  newsRadios: Radio[]
}

export const getStaticProps: GetStaticProps<HomeProps> = () => {
  return {
    props: {
      featuredRadios: getFeaturedRadios(),
      musicRadios: getRadioByGenre('music'),
      newsRadios: getRadioByGenre('news')
    }
  }
}

const Home: NextPage<HomeProps> = ({ featuredRadios, musicRadios, newsRadios }) => {
  return (
    <div className="px-12 py-4">
      <h1 className="text-3xl border-b py-4">浏览</h1>
      <div>
        <GridList >
          {
            featuredRadios.map(radio => <FeatureRadioComponent radio={radio} key={radio.slug} />)
          }
        </GridList>
      </div>
      <div>
        <h2 className="text-xl border-t pt-4 mt-2 font-semibold">音乐电台</h2>
        <GridList>
          {
            musicRadios.map(radio => <RadioComponent radio={radio} key={radio.slug} />)
          }
        </GridList>
      </div>
      <div>
        <h2 className="text-xl border-t pt-4 mt-2 font-semibold">新闻电台</h2>
        <GridList>
          {
            newsRadios.map(radio => <RadioComponent radio={radio} key={radio.slug} />)
          }
        </GridList>
      </div>
    </div>
  )
}

export default Home
