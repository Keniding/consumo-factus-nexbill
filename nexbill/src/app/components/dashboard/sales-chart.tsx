'use client'
import { useQuery } from '@tanstack/react-query'
import { Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { factusApi } from "@/src/app/lib/api"
import { ElegantCard } from "@/src/app/components/ui/ElegantCard"
import { useMemo } from 'react'
import { useAuth } from "@/src/app/hooks/useAuth"

export function SalesChart() {
    const { isAuthenticated } = useAuth()

    const { data: billsResponse, isLoading, error } = useQuery({
        queryKey: ['bills-chart'],
        queryFn: () => factusApi.facturas.list(),
        enabled: isAuthenticated
    })

    const chartData = useMemo(() => {
        if (!billsResponse?.data.data) return []

        const salesByDate = billsResponse.data.data.reduce((acc, bill) => {
            const date = bill.created_at?.split(' ')[0] || 'Sin fecha'
            if (!acc[date]) {
                acc[date] = 0
            }
            acc[date] += Number(bill.total)
            return acc
        }, {} as Record<string, number>)

        return Object.entries(salesByDate)
            .map(([date, total]) => ({
                date,
                total: Number(total.toFixed(2))
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }, [billsResponse])

    if (isLoading) {
        return (
            <ElegantCard>
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Ventas por Día</h2>
                    <div className="w-full h-[300px] flex items-center justify-center">
                        <div className="animate-pulse space-y-4 w-full">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-[250px] bg-gray-100 rounded w-full"></div>
                        </div>
                    </div>
                </div>
            </ElegantCard>
        )
    }

    if (error) {
        return (
            <ElegantCard>
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Ventas por Día</h2>
                    <div className="w-full h-[300px] flex items-center justify-center">
                        <p className="text-red-500">Error al cargar los datos de ventas</p>
                    </div>
                </div>
            </ElegantCard>
        )
    }

    return (
        <ElegantCard>
            <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Ventas por Día</h2>
                <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <XAxis
                                dataKey="date"
                                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                            />
                            <YAxis />
                            <Tooltip
                                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Total']}
                                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                            />
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#8884d8"
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </ElegantCard>
    )
}
