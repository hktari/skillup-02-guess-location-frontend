import { ItemList, LeaderboardItem, LocationImage } from './interface'

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

async function getBestGuesses(userId: any, startIdx: number, pageSize: number): Promise<ItemList<LocationImage>> {
    return await getAll(0, 0)
}

async function getUploads(userId: string | number, startIdx: number, pageSize: number) {
    const req = await fetch(`http://localhost:5983/locations?_userId=${userId}`)
    const uploads = await req.json()
    return {
        startIdx,
        totalItems: uploads.length,
        pageSize,
        items: uploads
    }
}

async function getLeaderboard(locationId: string | number, startIdx: number = 0, pageSize: number = -1) {
    const req = await fetch(`http://localhost:5983/locationGuess?locationId=${locationId}&_expand=user&_sort=guessErrorMeters&_order=asc`)
    const items: LeaderboardItem[] = JSON.parse(await req.text(), function (key, value) {
        if (key == "createdAt") {
            return new Date(value);
        } else {
            return value;
        }
    })

    return {
        startIdx: startIdx,
        totalItems: items.length,
        pageSize: items.length,
        items: items
    }
}

export default {
    getAll,
    getLeaderboard,
    getUploads,
    getBestGuesses
}

