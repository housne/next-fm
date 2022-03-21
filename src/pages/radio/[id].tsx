import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { NOT_FOUND } from "../../constants";
import { getRadio } from "../../lib/api";
import { usePlayer } from "../../context/player";
import { Radio } from "../../types/radio";
import { PlayButton } from "../../components/play-button";
import styles from '../../styles/radio.module.scss';
import classNames from "classnames";
import Link from "next/link";
import { GenreLink } from "../../components/radio-card";

type RadioPageProps = {
  radio?: Radio
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params.id !== 'string') {
    return NOT_FOUND
  }
  const radio = await getRadio(+params.id)
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
  const { getPlayState } = usePlayer()
  const playState = getPlayState(radio)
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
        <div className={classNames("relative w-[270px] h-[270px] rounded-md", styles.cover)}>
          <Image src={radio.thumbnail} layout="fill" objectFit="cover" alt={radio.name} className="rounded-md" />
        </div>
        <div className="flex-1 pl-8 flex flex-col py-6">
          <div className="flex flex-col pt-6 flex-1">
            {
              radio.org && (
                <div className="text-sm text-gray-500 mb-2">
                  <Link href={`/org/${radio.org.id}`}>{radio.org.name}</Link>
                </div>
              )
            }
            <h1 className="text-4xl font-semibold">{radio.name}</h1>
            <div className="mt-4 text-red-500">
            {
              radio.genres.map(genre => <GenreLink genre={genre.genre} key={genre.genre_id} />)
            }
            </div>
          </div>
          <div className="flex">
            <PlayButton loading={{secondaryColor: 'transparent'}} radio={radio} className="text-red-500 bg-gray-100 rounded-full w-[24px] h-[24px] flex items-center justify-center hover:bg-red-500 hover:text-white" />
            <span className="ml-1.5 text-red-500">{ playStateText() }</span>
          </div>
        </div>
      </div>
      {
        radio.description && <div className="py-12 text-gray-500 prose" dangerouslySetInnerHTML={{__html: radio.description}} />
      }
    </div>
  )
}

export default RadioPage