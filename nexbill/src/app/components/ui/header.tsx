import { Bell } from 'lucide-react'

export default function Header() {
    return (
        <header className="bg-white shadow">
            <div className="flex justify-between items-center px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Sistema de Facturación
                </h2>
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                    <Bell className="h-6 w-6" />
                </button>
            </div>
        </header>
    )
}