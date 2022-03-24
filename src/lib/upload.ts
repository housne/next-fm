import cloudinary from 'cloudinary'

export async function upload(file: string, options?: cloudinary.UploadApiOptions) {
  return cloudinary.v2.uploader.upload(file, options)
}