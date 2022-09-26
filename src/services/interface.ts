interface LocationImage {
    id: any,
    address: string,
    lat: number,
    long: number,
    image: string,
    userId: number,
    createdAt: Date,
    guessErrorMeters?: number
}

interface User {
    id: string | number,
    image: string,
    firstName: string,
    lastName: string,
    email: string
}

interface LeaderboardItem {
    id: string | number,
    rank: number,
    createdAt: Date,
    guessErrorMeters: number,
    user: User
}

interface ItemList<TItem> {
    startIdx: number,
    pageSize: number,
    totalItems: number,
    items: TItem[]
}

interface ApiResult<TPayload> {
    errors?: string[]
    payload: TPayload
}
interface JWT {
    access_token: string,
    expiresAt: Date
}

interface LoginApiResult extends ApiResult<JWT> {
}

export type {
    JWT,
    ApiResult,
    LoginApiResult,
    LocationImage,
    ItemList,
    LeaderboardItem,
    User
}


