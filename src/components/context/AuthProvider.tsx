import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import authApi from '../../services/authApi';
import { ApiResult, JWT, User } from '../../services/interface';
import userApi from '../../services/userApi';
import apiClient from '../../services/httpService'

export interface AuthContextType {
    user: User | null;
    login: (username: string, pwd: string) => Promise<User>;
    logout: () => void;
    isLoggedIn: () => boolean
    changePassword: (newPassword: string) => Promise<void>
    updateProfile: (firstName: string, lastName: string) => void,
    updateProfileImage: (imageBase64: string) => void
}

var AuthContext = React.createContext<AuthContextType>({ user: null, login: null!, logout: null!, isLoggedIn: () => false, updateProfile: null!, updateProfileImage: null!, changePassword: null! });


function validTokenExists() {
    const jwtJSON = localStorage.getItem('jwt')

    if (jwtJSON) {
        console.log('parsing jwt from local storage', jwtJSON)

        const jwt = JSON.parse(jwtJSON, (key, val) => {
            if (key === 'expiresAt') {
                return new Date(val)
            }
            return val
        }) as JWT

        console.log('Checking for token expiry jwt', jwt)
        return jwt.expiresAt && jwt.expiresAt.getTime() > Date.now()
    }

    return false
}
function setAccessToken(jwt: JWT) {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    console.log('setting access token to', jwt)
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${jwt.access_token}`;
}
function clearAccessToken() {
    localStorage.setItem("jwt", "");
    apiClient.defaults.headers.common['Authorization'] = '';
}

function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<User | null>(null);
    const navigate = useNavigate()

    // get user profile on app start if valid token exists
    useEffect(() => {
        async function getUserProfile() {
            try {
                const user = await userApi.getMyUserProfile()
                setUser(user)
                console.log('navigating to dashboard')
                navigate('/dashboard')
            } catch (error: any) {
                console.error('Failed to get user profilo info', error.message)
            }
        }

        if (validTokenExists()) {
            console.log('logging in user...')
            getUserProfile()
        }
    }, [])



    let login = async (username: string, pwd: string) => {
        const jwt = await authApi.login(username, pwd)
        setAccessToken(jwt)

        console.log('retrieving user profile')
        const user = await userApi.getMyUserProfile()
        setUser(user);
        return user
    }

    let logout = () => {
        authApi.logout()
        setUser(null);
        clearAccessToken()
    };

    const updateProfile = async (firstName: string, lastName: string) => {
        if (!user) {
            throw new Error('Cant update profile. Not logged in.')
        }

        const userUpdate = await authApi.updateProfile(user.email, firstName, lastName)
        setUser(userUpdate)
    }

    const updateProfileImage = async (imageBase64: string) => {
        if (!user) {
            throw new Error('Cant change profile image. Not logged in.')
        }

        const userUpdate = await authApi.updateProfileImage(user.email, imageBase64)
        setUser(userUpdate)
    }

    const changePassword = async (newPassword: string) => {
        if (!user) {
            throw new Error('Cant change password. Not logged in.')
        }

        return await authApi.changePassword(user.email, newPassword)
    }

    let isLoggedIn = () => user !== null;

    let value = { user, login, logout, isLoggedIn, updateProfile, updateProfileImage, changePassword };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() {
    return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();

    if (!auth.isLoggedIn()) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default AuthProvider