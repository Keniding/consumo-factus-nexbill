'use client'

import { useQuery } from '@tanstack/react-query'
import { ElegantCard } from "@/src/app/components/ui/ElegantCard"
import { factusApi } from "@/src/app/lib/api"
import type { DashboardStats, StatCardProps } from "@/src/app/types/stat"
import {useAuth} from "@/src/app/hooks/useAuth";

const StatCard = ({ title, value, isLoading }: StatCardProps) => (
    <ElegantCard>
        <div className="p-6">
            {isLoading ? (
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
            ) : (
                <>
                    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                    <p className="text-3xl font-semibold">{value}</p>
                </>
            )}
        </div>
    </ElegantCard>
)

export function DashboardStats() {
    const { isAuthenticated } = useAuth()

    const { data: stats, isLoading, error } = useQuery<DashboardStats>({
        queryKey: ['dashboard-stats'],
        queryFn: async () => {
            const response = await factusApi.facturas.list()
            const bills = response.data.data

            return {
                totalBills: response.data.pagination.total,
                totalAmount: bills.reduce((acc, bill) => acc + Number(bill.total), 0),
                validatedBills: bills.filter(bill => bill.status === 1).length,
                pendingBills: bills.filter(bill => bill.status === 0).length
            }
        },
        enabled: isAuthenticated
    })

    if (error) {
        return (
            <div className="grid grid-cols-1 gap-4">
                <ElegantCard>
                    <div className="p-6 text-red-500 flex items-center justify-center">
                        <p>Error al cargar las estadísticas. Por favor, intente nuevamente.</p>
                    </div>
                </ElegantCard>
            </div>
        )
    }

    const statsConfig = [
        {
            title: 'Total Facturas',
            value: stats?.totalBills || 0
        },
        {
            title: 'Monto Total',
            value: `$${stats?.totalAmount.toLocaleString() || 0}`
        },
        {
            title: 'Facturas Validadas',
            value: stats?.validatedBills || 0
        },
        {
            title: 'Facturas Pendientes',
            value: stats?.pendingBills || 0
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {statsConfig.map((stat, index) => (
                <StatCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    isLoading={isLoading}
                />
            ))}
        </div>
    )
}
