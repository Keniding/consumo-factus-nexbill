import axios from 'axios'
import { API_CONFIG } from '../config/api.config'
import { Factura, FacturaInput } from "@/src/app/types/factura"
import { LoginCredentials } from "@/src/app/types/auth"
import { AUTH_CONFIG } from "@/src/app/config/auth"
import { useAuthStore } from "@/src/app/lib/store"
import { ApiResponse, PaginatedResponse } from "@/src/app/types/api"

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            const refreshToken = useAuthStore.getState().refreshToken

            if (!refreshToken) {
                useAuthStore.getState().logout()
                window.location.href = '/login'
                return Promise.reject(error)
            }

            try {
                const response = await api.post(API_CONFIG.ENDPOINTS.AUTH, {
                    grant_type: 'refresh_token',
                    client_id: AUTH_CONFIG.CLIENT_ID,
                    client_secret: AUTH_CONFIG.CLIENT_SECRET,
                    refresh_token: refreshToken
                })

                const { access_token, refresh_token, expires_in } = response.data

                useAuthStore.setState({
                    token: access_token,
                    refreshToken: refresh_token,
                    expiresIn: Date.now() + (expires_in * 1000)
                })

                originalRequest.headers.Authorization = `Bearer ${access_token}`
                return api(originalRequest)
            } catch (refreshError) {
                useAuthStore.getState().logout()
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export const factusApi = {
    auth: {
        login: async (credentials: LoginCredentials) => {
            const response = await api.post(API_CONFIG.ENDPOINTS.AUTH, {
                ...credentials,
                grant_type: AUTH_CONFIG.GRANT_TYPE,
                client_id: AUTH_CONFIG.CLIENT_ID,
                client_secret: AUTH_CONFIG.CLIENT_SECRET,
            })
            return response.data
        }
    },
    facturas: {
        create: async (factura: FacturaInput) => {
            const response = await api.post<ApiResponse<Factura>>(
                API_CONFIG.ENDPOINTS.BILLS.VALIDATE,
                factura
            )
            return response.data
        },
        list: async (params?: { limit?: number; page?: number }) => {
            const response = await api.get<ApiResponse<PaginatedResponse<Factura>>>(
                API_CONFIG.ENDPOINTS.BILLS.LIST,
                {
                    params: {
                        per_page: params?.limit,
                        page: params?.page
                    }
                }
            )
            return response.data
        }
    }
}