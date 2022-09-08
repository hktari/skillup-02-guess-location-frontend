import React, { useEffect, useState } from 'react'
import { ItemList, LocationImage } from '../../services/interface'
import LocationImageComponent from '../Dashboard/LocationImageComponent'
import LocationImageGuess from '../Dashboard/LocationImageGuess'
import LocationImageLocked from '../Landing/LocationImageLocked'
import EditableLocationImage from '../Profile/EditableLocationImage'

export enum LocationImageType {
    GuessResult,
    LocationImage,
    EditableLocationImage,
    Locked,
}

type ImageListProps = {
    itemType: LocationImageType,
    loadMoreItems: (startIdx: number, pageSize: number) => Promise<ItemList<LocationImage>>
    pageSize?: number
    needsUpdate?: number
}

const ImageList = ({ itemType, loadMoreItems, pageSize = 3, needsUpdate = 0 }: ImageListProps) => {
    const [curPage, setCurPage] = useState<number>(1)
    const [items, setItems] = useState<LocationImage[]>([])
    const [canLoadMore, setCanLoadMore] = useState(true)

    async function onLoadMoreClicked(page?: number) {
        const list = await loadMoreItems((page ?? curPage - 1) * pageSize, pageSize)

        setItems(items.concat(list.items))
        setCurPage(list.startIdx / list.pageSize + 1)
        setCanLoadMore(+list.startIdx + +list.pageSize < +list.totalItems)
    }

    // initialize
    useEffect(() => {
        setItems([])
        onLoadMoreClicked()
    }, [needsUpdate])


    function onLoadMoreClickedInternal() {
        onLoadMoreClicked(curPage + 1);
    }


    function GetLocationImage({ img }: { img: LocationImage }) {
        switch (itemType) {
            case LocationImageType.GuessResult:
                return (<LocationImageGuess locationImage={img} />)
            case LocationImageType.LocationImage:
                return (<LocationImageComponent locationImage={img} />);
            case LocationImageType.EditableLocationImage:
                return (<EditableLocationImage locationImage={img} />);
            case LocationImageType.Locked:
                return (<LocationImageLocked title={img.address} img={img} />)
            default:
                return <>no image</>
        }
    }

    return (
        <div className="w3-row img-list-container">
            {
                items.map(i => {
                    return (
                        <div className="w3-mobile w3-third img-item" >
                            <GetLocationImage img={i} />
                        </div>
                    )
                })
            }

            <div className="w3-center w3-col">
                <button hidden={!canLoadMore} className="btn btn-outline" onClick={() => onLoadMoreClickedInternal()}>
                    load more
                </button>

            </div>
        </div >
    )
}

export default ImageList