import React, { useRef, useState } from 'react'
import { fileToBase64 } from '../../util/fileUtil'
import { useFormContext } from 'react-hook-form'

type PickImageComponentProps = {
  onImagePicked: (imageBase64: string) => void
  image?: string
}

const PickImageComponent = ({
  onImagePicked,
  image = '',
}: PickImageComponentProps) => {
  const [selectedImage, setSelectedImage] = useState(image)
  const selectedImageRef = useRef<HTMLInputElement | null>(null)

  const { register, setValue } = useFormContext()

  async function handleOnImagePicked(event: any) {
    if (event.target && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0])

      const selectedImgEl: HTMLImageElement = document.getElementById(
        'selectedImage',
      ) as HTMLImageElement
      selectedImgEl.onload = () => {
        URL.revokeObjectURL(selectedImgEl.src)
      }

      setSelectedImage(URL.createObjectURL(event.target.files[0]))

      const imgBase64 = await fileToBase64(event.target.files[0])
      onImagePicked(imgBase64)
      setValue('imageBase64', imgBase64)
    }
  }

  return (
    <button
      type="button"
      aria-labelledby="select profile image"
      className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-200 hover:bg-gray-600 hover:ring-gray-800"
      onClick={() => selectedImageRef.current?.click()}
    >
      <span className="material-icons text-3xl text-gray-600 group-hover:text-white">
        person
      </span>
      <img
        className="w-100 absolute"
        id="selectedImage"
        src={selectedImage}
        alt=""
        hidden={!selectedImage}
      />
      <input
        accept="image/png, image/jpeg"
        type="file"
        ref={selectedImageRef}
        style={{ display: 'none' }}
        onChange={handleOnImagePicked}
      />
      <input type="hidden" {...register('imageBase64')} />
    </button>
  )
}

export default PickImageComponent
