'use client'
import Link from "next/link"

const AdminNavbar = () => {


    return (
        <div className="flex items-center justify-between px-12 py-3 border-b border-slate-200 transition-all">
            <Link href="/" className="relative text-4xl font-semibold text-slate-700">
                <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">.Prisma</span>Ofertas<span className="text-green-600 text-5xl leading-0"></span>
                <p className="absolute text-xs font-semibold -top-1 -right-13 px-3 p-0.5 rounded-full flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">
                    Admin
                </p>
            </Link>
            <div className="flex items-center gap-3">
                <p>Olá, Administrador</p>
            </div>
        </div>
    )
}

export default AdminNavbar