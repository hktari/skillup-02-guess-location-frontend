import { User } from '../services/interface'

export interface ApiResult {
    errors?: []
}

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

async function updateProfile(email: string, firstName: string, lastName: string): Promise<User> {
    return Promise.resolve({
        id: 0,
        email,
        firstName,
        lastName,
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
    })
}

async function updateProfileImage(email: string, imageBase64: string): Promise<User> {
    return Promise.resolve({
        id: 0,
        firstName: 'TODO',
        lastName: 'TODO',
        email,
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
    })
}

async function changePassword(email: string, newPassword: string): Promise<ApiResult> {
    return Promise.resolve({

    })
}

const authApi = {
    updateProfile,
    updateProfileImage,
    changePassword,
    logout,
    login,
    signup
}

export default authApi