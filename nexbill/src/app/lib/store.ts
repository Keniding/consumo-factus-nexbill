import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
import { factusApi } from "@/src/app/lib/api"
import { LoginCredentials, User } from "@/src/app/types/auth"

interface AuthState {
    token: string | null
    refreshToken: string | null
    expiresIn: number | null
    user: User | null
    login: (credentials: LoginCredentials) => Promise<void>
    logout: () => void
}

const createAuthStore: StateCreator<AuthState> = (set) => ({
    token: null,
    refreshToken: null,
    expiresIn: null,
    user: null,
    login: async (credentials) => {
        const response = await factusApi.auth.login(credentials)
        set({
            token: response.access_token,
            refreshToken: response.refresh_token,
            expiresIn: response.expires_in,
            user: null
        })

        localStorage.setItem('token', response.access_token)
    },
    logout: () => {
        set({
            token: null,
            refreshToken: null,
            expiresIn: null,
            user: null
        })
        localStorage.removeItem('token')
        localStorage.removeItem('auth-storage')
    }
})

export const useAuthStore = create<AuthState>()(
    persist(createAuthStore, {
        name: 'auth-storage',
        partialize: (state) => ({
            token: state.token,
            refreshToken: state.refreshToken,
            expiresIn: state.expiresIn,
            user: state.user
        })
    }) as StateCreator<AuthState>
)
