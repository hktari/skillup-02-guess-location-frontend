interface LocationImage {
    id: any,
    address: string,
    lat: number,
    long: number,
    imageUrl: string,
    userId: number,
    createdAt: Date,
    guessResult?: GuessResult
}
export interface GuessResult {
    lat: number;
    lng: number;
    address: string;
    errorInMeters: number;
    user: User;
    location: Location;
    id: string;
    createdDate: Date;
}

interface User {
    id: string | number,
    imageUrl: string,
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


