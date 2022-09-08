import { LocationImage } from "./interface"

async function getAll(): Promise<LocationImage[]> {
    const req = await fetch('http://localhost:5983/locations')
    return (await req.json()) as LocationImage[]
}


export default {
    getAll
}

