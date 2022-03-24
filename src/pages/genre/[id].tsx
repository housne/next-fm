import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { PageHeaderComponent } from '../../components/page-header'
import { RadioCardListComponent } from '../../components/radio-card-list'
import { RadioListWithPagination } from '../../components/radio-list-with-pagination'
import { NOT_FOUND } from '../../constants'
import { getGenreById, listAllGenre, getRadiosByGenre } from '../../lib/api'
import type { Genre, Radio } from '../../types/radio'

type GenrePageProps = {
  genre?: Genre
  radios?: Radio[]
  featuredRadios?: Radio[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const genres = await listAllGenre()
  return {
    paths: genres.map(g => ({params: {id: g.id.toString()}})),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<GenrePageProps> = async ({params}) => {
  if (!params || typeof params.id !== 'string') {
    return NOT_FOUND
  }
  const id = + params.id
  const genre = await getGenreById(id)
  if (!genre) {
    return NOT_FOUND
  }
  return {
    props: {
      genre,
      radios: await getRadiosByGenre(id),
      featuredRadios: await getRadiosByGenre(id, {is_featured: true})
    }
  }
}

const GenrePage: NextPage<GenrePageProps> = ({ featuredRadios, radios, genre }) => {
  if (!genre || !featuredRadios || !radios) {
    return null
  }
  return (
    <div className="px-4 md:px-12 py-4">
      <Head>
        <title>{genre.name}</title>
      </Head>
      <PageHeaderComponent title={genre.name} />
      {
        featuredRadios.length > 0 && (
          <div className="border-b mt-4">
            <RadioCardListComponent radios={featuredRadios} isFeatured />
          </div>
        )
      }
      <div className="mt-4">
        <RadioListWithPagination radios={radios} type="genre" id={genre.id} />
      </div>
    </div>
  )
}

export default GenrePage