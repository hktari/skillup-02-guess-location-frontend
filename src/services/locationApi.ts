import { ApiResult, ItemList, LeaderboardItem, LocationImage } from './interface'
import axios from './httpService'

async function getAll(startIdx: number, pageSize: number): Promise<ItemList<LocationImage>> {
    return axios.get('/location', { params: { startIdx, pageSize } })
}

async function getNewUploads(startIdx: number, pageSize: number) {
    return getAll(startIdx, pageSize)
}

async function getBestGuesses(userId: any, startIdx: number, pageSize: number): Promise<ItemList<LocationImage>> {
    const user = await axios.get(`user/${userId}`)
    return {
        startIdx,
        pageSize,
        totalItems: user.guesses.length,
        items: user.guesses
    }
}

async function getUploads(userId: string | number, startIdx: number, pageSize: number) {
    const user = await axios.get(`user/${userId}`)
    return {
        startIdx,
        pageSize,
        totalItems: user.locations.length,
        items: user.locations
    }
}

async function getLeaderboard(locationId: string | number, startIdx: number = 0, pageSize: number = -1) {
    const location = await axios.get('/location' + locationId)
    return {
        startIdx,
        pageSize,
        totalItems: location.guesses.length,
        items: location.guesses
    }
}

function deleteLocation(locationId: string | number): Promise<void> {
    return axios.delete('/location/' + locationId)
}

const locationApi = {
    deleteLocation,
    getAll,
    getLeaderboard,
    getUploads,
    getNewUploads,
    getBestGuesses
}

export default locationApi
