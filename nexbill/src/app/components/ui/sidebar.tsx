import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Home,
    FileText,
    FileDown,
    Settings,
    LogOut
} from 'lucide-react'
import {useAuthStore} from "@/src/app/lib/store";
import {cn} from "@/src/app/lib/utils";

export default function Sidebar() {
    const pathname = usePathname()
    const logout = useAuthStore(state => state.logout)

    const links = [
        { href: '/', label: 'Dashboard', icon: Home },
        { href: '/bills', label: 'Facturas', icon: FileText },
        { href: '/credit-notes', label: 'Notas Crédito', icon: FileDown },
        { href: '/settings', label: 'Configuración', icon: Settings },
    ]

    return (
        <div className="flex flex-col w-64 bg-gray-800">
            <div className="flex items-center justify-center h-16 bg-gray-900">
                <span className="text-white font-bold">FACTUS</span>
            </div>
            <div className="flex flex-col flex-1">
                <nav className="flex-1 px-2 py-4 space-y-1">
                    {links.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                'flex items-center px-4 py-2 text-sm font-medium rounded-md',
                                pathname === href
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700'
                            )}
                        >
                            <Icon className="mr-3 h-6 w-6" />
                            {label}
                        </Link>
                    ))}
                </nav>
                <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
                    <button
                        onClick={() => logout()}
                        className="flex-shrink-0 w-full group block"
                    >
                        <div className="flex items-center">
                            <LogOut className="mr-3 h-6 w-6 text-gray-300" />
                            <div className="text-sm font-medium text-gray-300">
                                Cerrar Sesión
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}