'use client'

import { useAuth } from "@/src/app/hooks/useAuth"
import Sidebar from "@/src/app/components/ui/sidebar"
import Header from "@/src/app/components/ui/header"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace('/login')
        }
    }, [isLoading, isAuthenticated, router])

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <div className="h-screen flex">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
