export interface LoginCredentials {
    grant_type: string
    client_id: string
    client_secret: string
    username: string
    password: string
}

export interface User {
    id: number
    name: string
    email: string
    role: string
}

export interface AuthResponse {
    token_type: string
    expires_in: number
    access_token: string
    refresh_token: string
}