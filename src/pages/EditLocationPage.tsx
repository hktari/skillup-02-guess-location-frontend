import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../css/pages/EditLocationPage.css'
import { LocationImage } from '../services/interface'

type EditLocationPageProps = {
  locationImage: LocationImage
}

const EditLocationPage = () => {
  const [image, setImage] = useState<any>(null)
  const selectedImageRef = useRef<HTMLInputElement | null>(null)

  const navigate = useNavigate()
  const location = useLocation()
  const locationImage = location.state as LocationImage

  useEffect(() => {
    setImage(locationImage.imageUrl)
  }, [location.state])

  function onImagePicked(event: any) {
    if (event.target.files.length > 0) {
      const selectedImgEl: HTMLImageElement = document.getElementById(
        'selectedImage',
      ) as HTMLImageElement
      selectedImgEl.onload = () => {
        URL.revokeObjectURL(selectedImgEl.src)
      }
      setImage(URL.createObjectURL(event.target.files[0]))
    }
  }

  function onSave() {
    // todo: do request
    navigate('/dashboard')
  }

  function onCancel() {
    navigate('/dashboard')
  }

  return (
    <div className="edit-location container">
      <section className="section">
        <h2 className="header4">
          Edit <span className="text-positive">location</span>
        </h2>
        <div className="pick-image">
          <div hidden={image !== null}>
            <span className="material-icons">image</span>
          </div>

          <img src={image} id="selectedImage" alt="" hidden={image === null} />
        </div>
        <p className="body">Location: {locationImage.address}</p>
        <div className="btn-container w3-row">
          <div className="upload w3-col s12 m8">
            <button
              className="btn btn-positive btn-block"
              onClick={() => selectedImageRef.current?.click()}
            >
              UPLOAD IMAGE
              <input
                accept="image/png, image/jpeg"
                type="file"
                id="image"
                ref={selectedImageRef}
                style={{ display: 'none' }}
                onChange={onImagePicked}
              />
            </button>
          </div>
          <button onClick={onSave} className="btn btn-positive w3-col s6 m2">
            SAVE
          </button>
          <div className="w3-col s6 m2">
            <button onClick={onCancel} className="btn btn-outline w3-right">
              Cancel
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EditLocationPage
