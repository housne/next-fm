import radios from '../../data/radios.json'
import genres from '../../data/genres.json'

export type Genre = {
  name: string
  label: string
}

export type Radio = {
  name: string
  slug: string
  genre: Genre[]
  description: string
  thumbnail: string
  stream_url: string
  featured?: boolean
  hls?: boolean
}

export function getAllRadios(): Radio[] {
  return radios.map(r => {
    const genre = r.genre.map(g => genres.find(gs => gs.name === g)).filter(g => !!g) as Genre[]
    return {
      ...r,
      genre
    }
  })
}

export function getFeaturedRadios() {
  return getAllRadios().filter(r => r.featured)
}

export function getRadioBySlug(slug: string): Radio | undefined {
  return getAllRadios().find(r => r.slug === slug)
}

export function getRadioByGenre(genre: string): Radio[] {
  return getAllRadios().filter(r => !!r.genre.find(g => g.name === genre))
}
