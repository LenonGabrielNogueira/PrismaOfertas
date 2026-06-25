'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '@/components/Loading'
import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import BestSelling from '@/components/BestSelling' // Reutilizando para uma listagem genérica de produtos por enquanto
import Footer from '@/components/Footer'
import Title from '@/components/Title' // Para o título da página da loja

export default function Shop() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get(`/api/products`)
            setProducts(response.data.products)
        } catch (error) {
            console.error("Erro ao carregar produtos na loja:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllProducts()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="flex flex-col min-h-screen">
            <Banner />
            <Navbar />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-10">
                    <Title title="Nossa Loja" description="Explore todos os produtos disponíveis." visibleButton={false} />
                    <BestSelling products={products} />
                </div>
            </main>
            <Footer />
        </div>
    )
}
