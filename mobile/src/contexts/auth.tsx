import React, { useContext, createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios-config'

import noAvatarImg from 'assets/images/sem-avatar.svg'

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
    signIn(userAccount: { email: string, password: string, rememberUser: boolean }): Promise<any>,
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
        (async function fetchUserAndToken() {
            let fetch_user = await AsyncStorage.getItem('@proffy:user:data')
            let fetch_token = await AsyncStorage.getItem('@proffy:user:token')

            if (fetch_user && fetch_token) {
                setUser(JSON.parse(fetch_user))
                setToken(fetch_token)
            }
        })()
    }, [])

    async function signIn(userAccount: { email: string, password: string, rememberUser: boolean }) {
        setLoading(true)
        try {
            const response = await axios.post('/auth/signin', userAccount)
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
                AsyncStorage.setItem('@proffy:user:data', JSON.stringify(signedUser))
                AsyncStorage.setItem('@proffy:user:token', response.data.token)
            }

            return response
        } catch (res) {
            setLoading(false)
            return 'Erro ao fazer login. Verifique se o email e senha estão corretos e tente novamente.'
        }
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
        AsyncStorage.removeItem('@proffy:user:data')
        AsyncStorage.removeItem('@proffy:user:token')
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