import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { NOT_FOUND } from "../../constants";
import { getAllRadios, getRadioBySlug, Radio } from "../../lib/source";
import { IoPlayCircleOutline, IoPauseCircleOutline } from 'react-icons/io5'
import { useContext } from "react";
import { usePlayer } from "../../context/player";
import { PlayStateIcon } from "../../components/play-state-icon";
import { SpinnerComponent } from "../../components/spinner";

type RadioPageProps = {
  radio: Radio
}

export const getStaticPaths: GetStaticPaths = () => {
  const radios = getAllRadios()
  return {
    paths: radios.map(r => ({params: { slug: r.slug }})),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = ({ params }) => {
  if (!params || typeof params.slug !== 'string') {
    return NOT_FOUND
  }
  const radio = getRadioBySlug(params.slug)
  if (!radio) {
    return NOT_FOUND
  }
  return {
    props: {
      radio
    }
  }
}

const RadioPage: NextPage<RadioPageProps> = ({ radio }) => {
  const { play, pause, getPlayState } = usePlayer()
  const playState = getPlayState(radio)
  const playRadio = () => {
    (playState === 'playing' || playState === 'loading') ? pause() : play(radio)
  }
  const playStateText = () => {
    if (playState === 'paused') {
      return '播放'
    } else if (playState === 'playing') {
      return '暂停'
    } else if (playState === 'error') {
      return '网络错误'
    } else if (playState === 'loading') {
      return '加载中'
    }
    return '播放'
  }
  if (!radio) {
    return null
  }
  return (
    <div className="px-12 py-12">
      <div className="flex">
        <div className="relative w-[270px] h-[270px] rounded-md" style={{boxShadow: "\
            0.4px 1px 2.2px rgba(0, 0, 0, 0.031),\
            0.9px 2.5px 5.3px rgba(0, 0, 0, 0.044),\
            1.8px 4.6px 10px rgba(0, 0, 0, 0.055),\
            3.1px 8.3px 17.9px rgba(0, 0, 0, 0.066),\
            5.8px 15.5px 33.4px rgba(0, 0, 0, 0.079),\
            14px 37px 80px rgba(0, 0, 0, 0.11)"}}>
          <Image src={radio.thumbnail} layout="fill" objectFit="cover" alt={radio.name} className="rounded-md" />
        </div>
        <div className="flex-1 pl-8 flex flex-col py-6">
          <div className="flex flex-col justify-center flex-1">
            <div className="text-sm text-gray-500">
              {
                radio.genre.map(genre => <span key={genre.name}>{genre.label}</span>)
              }
            </div>
            <h1 className="text-4xl font-semibold">{radio.name}</h1>
          </div>
          <div className="flex">
            <button className="inline-flex items-center text-red-500 overflow-hidden" onClick={playRadio}>
              <div className={playState === 'loading' ? "" : "text-lg border-red-500 border-2 rounded-full inline-flex items-center justify-center w-[24px] h-[24px]"}>
                <PlayStateIcon state={playState} loading={{secondaryColor: 'transparent'}} />
              </div>
              <span className="ml-1.5">{ playStateText() }</span>
            </button>
          </div>
        </div>
      </div>
      <div className="py-12 text-gray-500 prose" dangerouslySetInnerHTML={{__html: radio.description}} />
    </div>
  )
}

export default RadioPage