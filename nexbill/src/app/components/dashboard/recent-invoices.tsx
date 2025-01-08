'use client'
import { useQuery } from '@tanstack/react-query'
import { factusApi } from "@/src/app/lib/api"
import { ElegantCard } from "@/src/app/components/ui/ElegantCard"
import { useAuth } from "@/src/app/hooks/useAuth"

export function RecentInvoices() {
    const { isAuthenticated } = useAuth()

    const { data: bills, isLoading, error } = useQuery({
        queryKey: ['recent-bills'],
        queryFn: () => factusApi.facturas.list({ limit: 5 }),
        enabled: isAuthenticated
    })

    if (isLoading) {
        return (
            <ElegantCard>
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Facturas Recientes</h2>
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="animate-pulse flex justify-between items-center">
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ElegantCard>
        )
    }

    if (error) {
        return (
            <ElegantCard>
                <div className="p-6">
                    <p className="text-red-500">Error al cargar las facturas recientes</p>
                </div>
            </ElegantCard>
        )
    }

    return (
        <ElegantCard>
            <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Facturas Recientes</h2>
                <div className="space-y-4">
                    {bills?.data.data.map((bill) => (
                        <div key={bill.id} className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">{bill.number}</p>
                                <p className="text-sm text-gray-500">
                                    {bill.graphic_representation_name}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">${Number(bill.total).toLocaleString()}</p>
                                <p className={`text-sm ${
                                    bill.status === 1 ? 'text-green-500' : 'text-yellow-500'
                                }`}>
                                    {bill.status === 1 ? 'Validada' : 'Pendiente'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ElegantCard>
    )
}
