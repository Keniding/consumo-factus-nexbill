'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { LoginCredentials } from '@/src/app/types/auth'
import { useAuthStore } from "@/src/app/lib/store"
import { ElegantCard } from "@/src/app/components/ui/ElegantCard"
import { ElegantButton } from "@/src/app/components/ui/ElegantButton"
import { AUTH_CONFIG } from '@/src/app/config/auth'

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const login = useAuthStore(state => state.login)

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            grant_type: AUTH_CONFIG.GRANT_TYPE,
            client_id: AUTH_CONFIG.CLIENT_ID,
            client_secret: AUTH_CONFIG.CLIENT_SECRET,
            username: '',
            password: ''
        }
    })

    const onSubmit = async (data: LoginCredentials) => {
        try {
            setIsLoading(true)
            await login(data)
            router.push(AUTH_CONFIG.DEFAULT_REDIRECT)
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-surface">
            <div className="w-full max-w-md px-4">
                <ElegantCard variant="elevated" className="w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
                            Iniciar Sesión
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Correo electrónico
                            </label>
                            <input
                                {...register('username', { required: true })}
                                type="email"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                                placeholder="correo@ejemplo.com"
                            />
                            {errors.username && (
                                <span className="text-red-500 text-sm">Campo requerido</span>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Contraseña
                            </label>
                            <input
                                {...register('password', { required: true })}
                                type="password"
                                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                                placeholder="********"
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm">Campo requerido</span>
                            )}
                        </div>

                        <ElegantButton
                            type="submit"
                            variant="primary"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </ElegantButton>
                    </form>
                </ElegantCard>
            </div>
        </div>
    )
}