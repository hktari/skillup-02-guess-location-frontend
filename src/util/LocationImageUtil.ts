import { ItemList, LocationImage } from '../services/interface'

export function EmptyList(): ItemList<LocationImage> {
    return {
        startIdx: 0,
        pageSize: 0,
        totalItems: 0,
        items: []
    }
}