'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import Loading from "../Loading"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import AdminNavbar from "./AdminNavbar"
import AdminSidebar from "./AdminSidebar"

const AdminLayout = ({ children }) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)

    const { user, isLoaded } = useUser()

    useEffect(() => {
        if (!isLoaded) return

        const adminEmail =
            process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase()

        const userEmail =
            user?.primaryEmailAddress?.emailAddress?.trim().toLowerCase()

        console.log("ADMIN EMAIL:", adminEmail)
        console.log("USER EMAIL:", userEmail)

        setIsAdmin(userEmail === adminEmail)
        setLoading(false)
        }, [isLoaded, user])

    return loading ? (
        <Loading />
    ) : isAdmin ? (
        <div className="flex flex-col h-screen">
            <AdminNavbar />
            <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar">
                <AdminSidebar />
                <div className="flex-1 h-full p-5 lg:pl-12 lg:pt-12 overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-2xl sm:text-4xl font-semibold text-slate-400">Você não tem autorização para acessar esta página.</h1>
            <Link href="/" className="bg-slate-700 text-white flex items-center gap-2 mt-8 p-2 px-6 max-sm:text-sm rounded-full">
                Ir para a página inicial <ArrowRightIcon size={18} />
            </Link>
        </div>
    )
}

export default AdminLayout