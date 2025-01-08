'use client'

import {DashboardStats} from "@/src/app/components/dashboard/stats";
import {RecentInvoices} from "@/src/app/components/dashboard/recent-invoices";
import {SalesChart} from "@/src/app/components/dashboard/sales-chart";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <DashboardStats />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RecentInvoices />
                <SalesChart />
            </div>
        </div>
    )
}
