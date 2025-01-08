export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api-sandbox.factus.com.co',
    ENDPOINTS: {
        AUTH: '/oauth/token',
        BILLS: {
            VALIDATE: '/v1/bills/validate',
            LIST: '/v1/bills'
        }
    }
} as const
