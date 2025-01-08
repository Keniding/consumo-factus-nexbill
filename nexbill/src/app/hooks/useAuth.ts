
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {useAuthStore} from "@/src/app/lib/store";

export const useAuth = (requireAuth: boolean = true) => {
    const { token, user, expiresIn } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        const isTokenExpired = () => {
            if (!expiresIn) return true
            return Date.now() >= expiresIn * 1000
        }

        if (requireAuth && (!token || isTokenExpired())) {
            router.push('/login')
        } else if (!requireAuth && token && !isTokenExpired()) {
            router.push('/dashboard')
        }
    }, [token, expiresIn, requireAuth, router])

    return { isAuthenticated: !!token, user }
}
