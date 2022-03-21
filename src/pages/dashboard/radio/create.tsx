import { NextPage } from "next";
import { ChangeEventHandler, FormEventHandler, FunctionComponent, InputHTMLAttributes, useCallback, useRef } from "react";
import { Checkbox } from "../../../components/checkbox";
import { GenreSelector } from "../../../components/dashboard/genre-selector";
import { OrgSelector } from "../../../components/dashboard/org-selector";
import { FileInput } from "../../../components/file-input";
import { Input } from "../../../components/input";
import { Textarea } from "../../../components/textarea";

const CreateRadioPage: NextPage = () => {
  const genresRef = useRef<number[]>([])
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const coverImageRef = useRef<HTMLImageElement>(null)

  const onGenresChange = useCallback((genres: number[]) => {
    genresRef.current = genres
  }, [])

  const uploadThumbnail: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const input = e.target as HTMLInputElement
    const file = input.files ? input.files[0] : undefined
    if (!file) {
      return
    }
    const data = new FormData()
    data.append('file', file, file.name)
    const res = await fetch(`/api/upload`, {
      method: 'POST',
      body: data
    })
    const json = await res.json()
    console.log(json)
    if (!thumbnailInputRef.current || !json.url || !coverImageRef.current) {
      return
    }
    thumbnailInputRef.current.value = json.url
    coverImageRef.current.src = json.url
    coverImageRef.current.style.display = 'block'
  }

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const data: any = {}
    for (let [k, v] of formData.entries()) {
      data[k] = v
    }
    data.genres = genresRef.current
    data.is_hls = !!data.is_hls
    data.is_featured = !!data.is_featured
    data.org_id = +data.org_id
    const res = await fetch(`/api/radio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const json = await res.json()
    console.log(json)
  }

  return (
    <div className="px-12 py-12">
      <h1 className="text-3xl">创建电台</h1>
      <div className="flex">
        <form onSubmit={handleSubmit} className="mt-6 w-[640px]">
          <Input label="名称" name="name" type="text" />
          <FileInput label="封面" onChange={uploadThumbnail} />
          <input name="thumbnail" readOnly type="hidden" className="form-input" required ref={thumbnailInputRef} />
          <OrgSelector  />
          <GenreSelector onChange={onGenresChange} />
          <Textarea label="描述" name="description" required rows={5} />
          <Input label="流地址" type="text" name="stream_url" />
          <Checkbox label="推荐电台" name="is_featured" />
          <Checkbox label="hls 格式流" name="is_hls" />
          <button className="mt-6 px-6 py-1.5 bg-red-500 text-white rounded-md" type="submit">创建</button>
        </form>
        <div className="relative w-[200px] h-[200px] bg-gray-100 flex items-center justify-center text-lg ml-6 mt-12">
          封面
          <img className="w-[200px] h-[200px] hidden absolute top-0 left-0" ref={coverImageRef} />
        </div>
      </div>
    </div>
  )
}

export default CreateRadioPage