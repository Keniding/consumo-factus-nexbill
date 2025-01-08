export const AUTH_CONFIG = {
    GRANT_TYPE: 'password',
    CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID || '',
    CLIENT_SECRET: process.env.NEXT_PUBLIC_CLIENT_SECRET || '',
    DEFAULT_REDIRECT: '/dashboard'
} as const

console.log('Variables de entorno:', {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET?.substring(0, 4) + '...'
})

if (!AUTH_CONFIG.CLIENT_ID || !AUTH_CONFIG.CLIENT_SECRET) {
    console.warn('⚠️ Credenciales de cliente no configuradas correctamente')
}
