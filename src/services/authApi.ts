import { User } from '../services/interface'

async function login(email: string, password: string): Promise<User> {
    return Promise.resolve({
        id: 0,
        firstName: 'Jacob',
        lastName: 'Jones',
        email: 'jabobjones@example.com',
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
    })
}

async function signup(email: string, firstName: string, lastName: string, password: string, imageBase64: string) {
    return Promise.resolve({
        id: 1,
        firstName,
        lastName,
        email,
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
    })
}


function logout() {

}

async function updateProfile(email: string, firstName: string, lastName: string, imageBase64: string): Promise<User> {
    return Promise.resolve({
        id: 0,
        email,
        firstName,
        lastName,
        image: imageBase64
    })
}

const authApi = {
    updateProfile,
    logout,
    login,
    signup
}

export default authApi;