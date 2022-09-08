export interface LocationImage {
    id: any,
    address: string,
    lat: number,
    long: number,
    image: string,
    userId: number,
    createdAt: Date,
    guessErrorMeters?: number
}



export interface ItemList<TItem> {
    startIdx: number,
    pageSize: number,
    totalItems: number,
    quotes: TItem[]
}
