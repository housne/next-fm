import Image from "next/image";
import { ChangeEventHandler, FunctionComponent, InputHTMLAttributes, useEffect, useRef, useState } from "react";
import { http } from "../lib/http";
import { FaUserCircle } from 'react-icons/fa'
import { PageSpinner } from "./spinner/page-spinner";

type ImageUploaderProps = InputHTMLAttributes<HTMLInputElement> & {
  onSuccess?: (url: string) => void
  defaultImageUrl?: string
  uploadDir?: string
}

export const ImageUploader: FunctionComponent<ImageUploaderProps> = ({ onSuccess, defaultImageUrl, uploadDir, ...props }) => {
  const valueInputRef = useRef<HTMLInputElement>(null)
  const [imageUrl, setImageUrl] = useState<string | undefined>(defaultImageUrl)
  const [isUploading, setIsUploading] = useState(false)

  const uploadImageRequest = async (file: string) => {
    setIsUploading(true)
    try {
      const { url } = await http.post<{url: string}>('/upload', {
        file,
        dir: uploadDir
      })
      setIsUploading(false)
      valueInputRef.current && (valueInputRef.current.value = url)
    } catch (e) {
      setIsUploading(false)
    }
  }

  const uploadImageHandler: ChangeEventHandler<HTMLInputElement> = e => {
    const target = e.target as HTMLInputElement
    const file = target.files ? target.files[0] : null
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      setImageUrl(reader.result as string)
      uploadImageRequest(reader.result as string)
    })
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (imageUrl) {
      return
    }
    setImageUrl(defaultImageUrl)
  }, [defaultImageUrl, imageUrl])

  return (
      <div className="relative">
        <div style={{height: 72, width: 72}} className="relative  overflow-hidden">
          <input type="file" 
            disabled={isUploading} 
            className="absolute z-20 top-0 opacity-0 left-0 text-[100px]"
            onChange={uploadImageHandler}
          />
          {
            imageUrl ? 
              <Image src={imageUrl} alt="avatar" width={72} height={72} className="rounded-full" /> : 
              <FaUserCircle className="text-gray-500 text-5xl" size={72} />
          }
          {isUploading && <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-full bg-white bg-opacity-50"><PageSpinner size={30} /></div>}
        </div>
        <input type="hidden" {...props} ref={valueInputRef} />
      </div>
  )
}