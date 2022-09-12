import { User } from "./interface"

async function getMyUserProfile(): Promise<User> {
    return Promise.resolve({
        id: 0,
        firstName: 'Jacob',
        lastName: 'Jones',
        email: 'jabobjones@example.com',
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
    })
}


const userApi = {
    getMyUserProfile
}

export default userApi