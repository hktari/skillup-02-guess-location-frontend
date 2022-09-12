import React, { useRef, useState } from 'react'
import { fileToBase64 } from '../../util/fileUtil';

type PickImageComponentProps = {
    onImagePicked: (imageBase64: string) => void

}

const PickImageComponent = (props: PickImageComponentProps) => {
    const [selectedImage, setSelectedImage] = useState('')
    const selectedImageRef = useRef<HTMLInputElement | null>(null);


    async function onImagePicked(event: any) {
        if (event.target.files.length > 0) {
            setSelectedImage(event.target.files[0]);

            const selectedImgEl: HTMLImageElement = document.getElementById('selectedImage') as HTMLImageElement
            selectedImgEl.onload = () => {
                URL.revokeObjectURL(selectedImgEl.src);
            }

            setSelectedImage(URL.createObjectURL(event.target.files[0]))

            const imgBase64 = await fileToBase64(event.target.files[0])
            onImagePicked(imgBase64)
        }
    }

    return (
        <button className='select-profile-img btn btn-circle'
            onClick={() => selectedImageRef.current?.click()}>
            <span className="material-icons">
                person
            </span>
            <img id='selectedImage' src={selectedImage} alt="" hidden={!selectedImage} />
            <input accept="image/png, image/jpeg" type='file' id='image'
                ref={selectedImageRef} style={{ display: 'none' }}
                onChange={onImagePicked} />
        </button>
    )
}

export default PickImageComponent