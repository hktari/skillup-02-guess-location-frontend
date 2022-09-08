import React, { useEffect, useState } from 'react'
import { ItemList, LocationImage } from '../../services/interface'
import LocationImageLocked from '../Landing/LocationImageLocked'


type ImageListProps = {
    itemsEditable: boolean,
    loadMoreItems: (startIdx: number, pageSize: number) => Promise<ItemList<LocationImage>>
    pageSize?: number
    needsUpdate?: number
}

const ImageList = ({ itemsEditable, loadMoreItems, pageSize = 3, needsUpdate = 0 }: ImageListProps) => {
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



    return (
        <div className="w3-row img-list-container">
            {
                // todo: switch on type of image
                <div className="w3-mobile w3-third img-item">
                    <LocationImageLocked img={locationImgSample1} title="san francisco" />
                </div>
                items.map(i => <)
            }

            <button hidden={!canLoadMore} className="btn btn-alt centered btn-wide" onClick={() => onLoadMoreClickedInternal()}>
                load more
            </button>
        </div>
    )
}

export default ImageList