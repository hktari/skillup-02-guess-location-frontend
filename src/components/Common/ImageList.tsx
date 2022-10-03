import React, { useEffect, useState } from 'react'
import { ItemList, LocationImage } from '../../services/interface'
import { useLocationsContext } from '../context/LocationProvider'
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
    pageSize?: number,
    colsPerRow?: number,
    needsUpdate?: number,
    noItemsText?: string
}

const ImageList = ({ itemType, loadMoreItems, pageSize = 3, needsUpdate = 0, colsPerRow = 3, noItemsText = 'nothing to see...' }: ImageListProps) => {
    const [curPage, setCurPage] = useState<number>(1)
    const [items, setItems] = useState<LocationImage[]>([])
    const [canLoadMore, setCanLoadMore] = useState(true)
    const [anyItems, setAnyItems] = useState(true)

    async function loadItems(shouldConcatItems: boolean = true) {
        const list = await loadMoreItems((curPage - 1) * pageSize, pageSize)
        if (shouldConcatItems) {
            setItems(items.concat(list.items))
        } else {
            setItems(list.items)
        }
        setCurPage(list.startIdx / list.pageSize + 1)
        setCanLoadMore(+list.startIdx + +list.pageSize < +list.totalItems)
    }


    const { updateIndicatorIdx } = useLocationsContext();


    useEffect(() => {
        setAnyItems(items.length !== 0)
    }, [items])

    //   refresh list
    useEffect(() => {
        loadItems(false)
    }, [updateIndicatorIdx])

    // initialize
    useEffect(() => {
        setItems([])
        loadItems()
    }, [needsUpdate])

    useEffect(() => {
        loadItems()
    }, [curPage])

    function onLoadMoreClickedInternal() {
        setCurPage(curPage + 1)
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
                items.map((item, index) => {
                    return (
                        <div key={index} className={`w3-mobile img-item ${colsPerRow === 3 ? 'w3-third' : 'w3-quarter'}`} >
                            < GetLocationImage key={item.id} img={item} />
                        </div>
                    )
                })
            }

            <p hidden={anyItems} className="body">{noItemsText}</p>
            <div hidden={!canLoadMore} className="w3-center w3-col">
                <button className="btn btn-outline" onClick={() => onLoadMoreClickedInternal()}>
                    load more
                </button>

            </div>
        </div >
    )
}

export default ImageList