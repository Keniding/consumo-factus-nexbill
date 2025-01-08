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
    isAuthenticated: () => boolean
}

const createAuthStore: StateCreator<AuthState> = (set, get) => ({
    token: null,
    refreshToken: null,
    expiresIn: null,
    user: null,
    isAuthenticated: () => {
        const state = get()
        if (!state.token || !state.expiresIn) return false

        return Date.now() < (state.expiresIn * 1000) - 5000
    },
    login: async (credentials) => {
        try {
            const response = await factusApi.auth.login(credentials)

            const expiresIn = Math.floor(Date.now() / 1000) + response.expires_in

            set({
                token: response.access_token,
                refreshToken: response.refresh_token,
                expiresIn: expiresIn,
                user: response.user || null
            })
        } catch (error) {
            get().logout()
            throw error
        }
    },
    logout: () => {
        set({
            token: null,
            refreshToken: null,
            expiresIn: null,
            user: null
        })

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
        }),
        version: 1,
        onRehydrateStorage: () => (state) => {
            if (state && state.expiresIn && Date.now() >= state.expiresIn * 1000) {
                // Si el token ha expirado, limpiamos el estado
                state.logout()
            }
        }
    }) as StateCreator<AuthState>
)

export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated()
