import { v2 as cloudinary } from "cloudinary"

export function uploadImage(buffer) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream((error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
      .end(buffer)
  })
}
