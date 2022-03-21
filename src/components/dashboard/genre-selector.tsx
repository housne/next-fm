import type { Genre } from "@prisma/client";
import { ChangeEventHandler, FunctionComponent, useEffect, useState } from "react";
import { Select } from "../select";

type GenreSelectorProps = {
  onChange?: (value: number[]) => void
}

export const GenreSelector: FunctionComponent<GenreSelectorProps> = ({ onChange }) => {
  const [genres, setGenres] = useState<Genre[]>([])
  const [selected, setSelected] = useState<string[]>()

  useEffect(() => {
    const fetchOrgs = async () => {
      const res = await fetch(`/api/genre`)
      const genres = await res.json()
      setGenres(genres)
      setSelected([genres[0].id])
      onChange && onChange([genres[0].id])
    }
    fetchOrgs()
  }, [onChange])

  const changeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const select = e.target as HTMLSelectElement
    const value = Array.from(select.selectedOptions, option => option.value)
    setSelected(value)
    onChange && onChange(value.map(v => +v))
  }

  return (
    <Select label="类别" multiple value={selected} onChange={changeHandler} name="genres">
      {
        genres.map(genre => <option value={genre.id} key={genre.id}>{genre.name}</option>)
      }
    </Select>
  )
}