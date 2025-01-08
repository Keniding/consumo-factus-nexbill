import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuthStore } from "@/src/app/lib/store"

export const useAuth = (requireAuth: boolean = true) => {
    const { token, user, isAuthenticated } = useAuthStore()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = setTimeout(() => {
            if (requireAuth && !isAuthenticated()) {
                useAuthStore.getState().logout()
                router.replace('/login')
            } else if (!requireAuth && isAuthenticated()) {
                router.replace('/dashboard')
            }
            setIsLoading(false)
        }, 100)

        return () => clearTimeout(checkAuth)
    }, [token, requireAuth, router])

    return { isAuthenticated: isAuthenticated(), user, isLoading }
}