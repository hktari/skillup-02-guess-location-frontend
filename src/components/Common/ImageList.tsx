import React, { useEffect, useState } from 'react'
import { ItemList, LocationImage } from '../../services/interface'
import LocationImageGuess from '../Dashboard/LocationImageGuess'
import LocationImageLocked from '../Landing/LocationImageLocked'

enum LocationImageType {
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

        setItems(items.concat(list.quotes))
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
                return (<LocationImageGuess text={`${img.guessErrorMeters} m`} title={img.address} img={img} />)
            case LocationImageType.LocationImage:
                return <></>;
            case LocationImageType.EditableLocationImage:
                return <></>
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

            <button hidden={!canLoadMore} className="btn btn-alt centered btn-wide" onClick={() => onLoadMoreClickedInternal()}>
                load more
            </button>
        </div >
    )
}

export default ImageList