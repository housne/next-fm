import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { PageHeaderComponent } from '../components/page-header'
import { RadioCardListComponent } from '../components/radio-card-list'
import { getFeaturedRadios, getRadiosByGenre, listAllGenre } from '../lib/api'
import type { Radio, Genre } from '../types/radio'

type HomeProps = {
  featuredRadios: Radio[]
  radioList: {genre: Genre, radios: Radio[]}[]
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allGenre = await listAllGenre()
  const getGenreRadios = async (genre: Genre) => {
    const radios = await getRadiosByGenre(genre.id)
    return {
      genre,
      radios
    }
  }
  const radioList = await Promise.all(allGenre.map(genre => getGenreRadios(genre)))
  return {
    props: {
      featuredRadios: await getFeaturedRadios(),
      radioList
    }
  }
}

const Home: NextPage<HomeProps> = ({ featuredRadios, radioList }) => {
  return (
    <div className="px-12 py-4">
      <Head>
        <title>电台</title>
      </Head>
      <PageHeaderComponent title="浏览" />
      <RadioCardListComponent radios={featuredRadios} isFeatured />
      {
        radioList.map(genre => (
          <div key={genre.genre.id}>
            <div className="border-t pt-4 pb-4 mt-6 flex items-center">
              <h2 className="text-xl font-semibold flex-1">{genre.genre.name}</h2>
              <Link href={`/genre/${genre.genre.id}`} passHref><a className="text-red-500">更多</a></Link>
            </div>
            <RadioCardListComponent radios={genre.radios} />
          </div>
        ))
      }
    </div>
  )
}

export default Home
