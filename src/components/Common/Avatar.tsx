import React from 'react'

type Props = {
  imageUrl?: string
}

const Avatar = ({ imageUrl }: Props) => {
  return (
    <div
      className={`grid h-full w-full grid-cols-1 grid-rows-1 items-center justify-center overflow-hidden rounded-full bg-gray-400 hover:ring-patina-200`}
    >
      {imageUrl && (
        <img
          className="col-start-1 col-end-2 row-start-1 row-end-2 h-full w-full object-cover"
          src={imageUrl}
          alt="avatar"
        />
      )}
      <span className="material-icons col-start-1 col-end-2 row-start-1 row-end-2 text-2xl text-white">
        user
      </span>
    </div>
  )
}

export default Avatar
