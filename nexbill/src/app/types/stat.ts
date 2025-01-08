export interface DashboardStats {
    totalBills: number
    totalAmount: number
    validatedBills: number
    pendingBills: number
}

export interface StatCardProps {
    title: string
    value: number | string
    isLoading?: boolean
}
