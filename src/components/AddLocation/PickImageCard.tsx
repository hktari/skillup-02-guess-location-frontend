import React, { useEffect, useRef, useState } from 'react'
import { fileToBase64 } from '../../util/fileUtil'
import LocationImageCard from '../LocationImageCard'
import FloatingIconButton from '../buttons/IconButton'

type Props = {
  setImageBase64: (imageBase64: string | null) => void
  imageBase64: string | null
  setSelectedImageUrl: (imageUrl: string) => void
  selectedImageUrl: string
}

const PickImageCard = ({
  setImageBase64,
  setSelectedImageUrl,
  imageBase64,
  selectedImageUrl,
}: Props) => {
  const selectedImageRef = useRef<HTMLInputElement | null>(null)
  const prevSelectedImageUrl = useRef(selectedImageUrl)

  useEffect(() => {
    if (prevSelectedImageUrl.current) {
      URL.revokeObjectURL(prevSelectedImageUrl.current)
    }

    prevSelectedImageUrl.current = selectedImageUrl
  }, [selectedImageUrl])

  function clearImage() {
    setSelectedImageUrl('')
    setImageBase64(null)
  }

  async function onImagePicked(event: any) {
    if (event.target.files.length > 0) {
      try {
        setSelectedImageUrl(URL.createObjectURL(event.target.files[0]))
        setImageBase64(await fileToBase64(event.target.files[0]))
      } catch (error) {
        console.error('failed to process image', error)
      }
    }
  }
  return (
    <div className="relative">
      <button
        aria-labelledby="pick image"
        onClick={() => selectedImageRef.current?.click()}
        className="grid h-40 md:h-60 w-full grid-cols-1 overflow-hidden rounded-md bg-gray-200"
      >
        <div
          className="col-span-1 row-span-full flex grid-cols-1 items-center justify-center"
          hidden={imageBase64 !== null}
        >
          <span className="material-icons text-6xl">image</span>
        </div>

        <div className="col-span-1 row-span-full grid-cols-1">
          {imageBase64 && <LocationImageCard imageUrl={imageBase64} />}
        </div>
      </button>
      <input
        accept="image/png, image/jpeg"
        type="file"
        id="image"
        ref={selectedImageRef}
        style={{ display: 'none' }}
        onChange={onImagePicked}
      />

      {selectedImageUrl && (
        <FloatingIconButton
          backgroundColor="red"
          aria-labelledby="clear image"
          position="top-right"
          onClick={clearImage}
          icon="close"
        ></FloatingIconButton>
      )}
    </div>
  )
}

export default PickImageCard
