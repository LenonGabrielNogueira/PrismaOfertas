'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '@/components/Loading'
import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import BestSelling from '@/components/BestSelling'
import LatestProducts from '@/components/LatestProducts'
import Footer from '@/components/Footer'

export default function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get(`/api/products`)
            setProducts(response.data.products)
        } catch (error) {
            console.error("Erro ao carregar produtos:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllProducts()
        
        // Registro de visita à home
        axios.post('/api/analytics/view', { 
            page: 'home',
            sessionId: window.sessionStorage.getItem('session_id') || 'public-session'
        }).catch(() => {})
    }, [])

    if (loading) return <Loading />

    return (
        <div className="flex flex-col min-h-screen">
            <Banner />
            <Navbar />
            <Hero />
            <main className="flex-grow">
                {/* Seções especializadas que recebem os produtos via props */}
                <BestSelling products={products} />
                <LatestProducts products={products} />
            </main>
            <Footer />
        </div>
    )
}