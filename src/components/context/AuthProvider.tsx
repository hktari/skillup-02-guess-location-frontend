import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import authApi from '../../services/authApi';
import { ApiResult, JWT, User } from '../../services/interface';
import userApi from '../../services/userApi';

export interface AuthContextType {
    user: User | null;
    login: (username: string, pwd: string) => Promise<User>;
    logout: () => void;
    isLoggedIn: () => boolean
    changePassword: (newPassword: string) => Promise<ApiResult>
    updateProfile: (firstName: string, lastName: string) => void,
    updateProfileImage: (imageBase64: string) => void
}

var AuthContext = React.createContext<AuthContextType>({ user: null, login: null!, logout: null!, isLoggedIn: () => false, updateProfile: null!, updateProfileImage: null!, changePassword: null! });


function validTokenExists() {
    const jwtJSON = localStorage.getItem('jwt')

    if (jwtJSON) {
        const jwt = JSON.parse(jwtJSON) as JWT
        console.log('Checking for token expiry jwt', jwt)
        return jwt.expiresAt.getTime() < Date.now()
    }

    return false
}

function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<User | null>(null);


    // get user profile on app start if valid token exists
    useEffect(() => {
        async function getUserProfile() {
            try {
                setUser(await userApi.getMyUserProfile())
            } catch (error) {
                console.error('Failed to get user profilo info', error)
            }
        }

        if (validTokenExists()) {
            getUserProfile()
        }
    }, [])



    let login = async (username: string, pwd: string) => {
        const { user, jwt, errors } = await authApi.login(username, pwd)
        if (!errors) {
            setUser(user);
            localStorage.setItem("jwt", JSON.stringify(jwt));
            return user
        } else {
            throw new Error(errors.join(', '))
        }
    }

    let logout = () => {
        authApi.logout()
        setUser(null);
        localStorage.setItem("jwt", "");
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