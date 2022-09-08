import { ItemList, LocationImage } from './interface'

async function getAll(startIdx: number, pageSize: number): Promise<ItemList<LocationImage>> {
    const req = await fetch('http://localhost:5983/locations')
    const items = await req.json()
    return {
        startIdx: startIdx,
        totalItems: items.length,
        pageSize: items.length,
        items: items as LocationImage[]
    }
}

export default {
    getAll
}

