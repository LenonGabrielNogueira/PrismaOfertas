'use client'
import Link from "next/link"

const AdminNavbar = () => {

    return (
        <div className="flex items-center justify-between gap-3 px-4 sm:px-8 lg:px-12 py-3 border-b border-slate-200 transition-all">
            <Link href="/" className="relative inline-flex items-center text-xl sm:text-2xl lg:text-4xl font-semibold text-slate-700 whitespace-nowrap">
                <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">.Prisma</span>
                Ofertas
                <span className="ml-1.5 sm:ml-2 text-[9px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient border border-slate-200 leading-none">
                    Admin
                </span>
            </Link>
            <div className="flex items-center gap-3 shrink-0">
                <p className="text-xs sm:text-sm text-slate-600 truncate max-w-[40vw] sm:max-w-none">
                    Olá, Administrador
                </p>
            </div>
        </div>
    )
}

export default AdminNavbar