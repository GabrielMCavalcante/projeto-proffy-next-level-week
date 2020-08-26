import React, { useContext, createContext, useState, useEffect } from 'react'
import axios from 'axios-config'

import noAvatarImg from '../assets/images/sem-avatar.svg' 

interface User {
    __id: string,
    name: string,
    email: string,
    avatar: string,
    whatsapp: string | null,
    bio: string | null
}

interface UserData {
    name: string,
    surname: string,
    email: string,
    password: string
}

interface AuthContextType {
    signedIn: boolean,
    user: User | null,
    token: string | null,
    signIn(userAccount: { email: string, password: string, rememberUser: boolean}): Promise<any>,
    signUp(userData: UserData): Promise<any>,
    signOut(): void,
    requestPasswordResetEmail(accountEmail: string): Promise<any>,
    updateUserPassword(resetData: { new_password: string, token: string }): Promise<any>
    loading: boolean
}

const AuthContext = createContext({} as AuthContextType)

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let fetch_user = localStorage.getItem('@proffy:user:data')
        let fetch_token = localStorage.getItem('@proffy:user:token')

        if(!fetch_user || !fetch_token) {
            fetch_user = sessionStorage.getItem("@proffy:user:data")
            fetch_token = sessionStorage.getItem("@proffy:user:token")
        }

        if (fetch_user && fetch_token) {
            setUser(JSON.parse(fetch_user))
            setToken(fetch_token)
        }
    }, [])

    function signIn(userAccount: { email: string, password: string, rememberUser: boolean}) {
        setLoading(true)
        return axios.post('/auth/signin', userAccount)
            .then(response => {
                setLoading(false)
                const signedUser = {
                    ...response.data.user,
                    avatar: response.data.user.avatar 
                        ? response.data.user.avatar
                        : noAvatarImg
                }
                setUser(signedUser)
                setToken(response.data.token)
                if (userAccount.rememberUser) {
                    localStorage.setItem('@proffy:user:data', JSON.stringify(signedUser))
                    localStorage.setItem('@proffy:user:token', response.data.token)
                } else {
                    sessionStorage.setItem('@proffy:user:data', JSON.stringify(signedUser))
                    sessionStorage.setItem('@proffy:user:token', response.data.token)
                }
                return response
            })
            .catch(res => {
                setLoading(false)
                return { ...res }.response.data.error
            })
    }

    async function signUp(userData: UserData) {
        setLoading(true)
        return axios.post('/auth/signup', userData)
            .then(() => setLoading(false))
            .catch(res => {
                setLoading(false)
                return { ...res }.response.data.error
            })

    }

    function signOut() {
        setUser(null)
        setToken(null)
        localStorage.removeItem('@proffy:user:data')
        localStorage.removeItem('@proffy:user:token')
        sessionStorage.removeItem('@proffy:user:data')
        sessionStorage.removeItem('@proffy:user:token')
    }

    async function requestPasswordResetEmail(email: string) {
        setLoading(true)
        return axios.post('/auth/password/reset', { email })
            .then(() => setLoading(false))
            .catch(res => {
                setLoading(false)
                return { ...res }.response.data.error
            })
    }

    async function updateUserPassword(resetData: { new_password: string, token: string }) {
        setLoading(true)
        return axios.put('/auth/password/reset/update', resetData)
            .then(() => setLoading(false))
            .catch(res => {
                setLoading(false)
                return { ...res }.response.data.error
            })
    }

    return (
        <AuthContext.Provider value={{
            signedIn: !!user,
            user,
            token,
            signIn,
            signUp,
            signOut,
            requestPasswordResetEmail,
            updateUserPassword,
            loading
        }}>{children}</AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}