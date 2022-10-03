interface LocationImage {
    id: any,
    address: string,
    lat: number,
    lng: number,
    imageUrl: string,
    user: User,
    createdDate: Date,
    guessResult?: GuessResult
}
export interface GuessResult {
    lat: number;
    lng: number;
    address: string;
    errorInMeters: number;
    user: User;
    location: LocationImage;
    id: string;
    createdDate: Date;
}

interface User {
    id: string,
    imageUrl: string,
    firstName: string,
    lastName: string,
    email: string
}

interface LeaderboardItem {
    id: string,
    rank: number,
    createdDate: Date,
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


