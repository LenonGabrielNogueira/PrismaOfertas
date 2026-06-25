'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Loading from '@/components/Loading'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

function SearchResults() {
    const searchParams = useSearchParams()
    const query = searchParams.get('q')
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchSearchResults = async () => {
        try {
            const response = await axios.get(`/api/products?search=${encodeURIComponent(query)}`)
            const results = response.data.data
            setProducts(results)
            
            axios.post('/api/analytics/search', { 
                query: query,
                resultsCount: results.length
            }).catch(() => {})

        } catch (error) {
            console.error("Erro na busca:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (query) {
            fetchSearchResults()
        }
    }, [query])

    if (loading) return <Loading />

    return (
        <main className="flex-grow px-6 md:px-16 lg:px-32 pt-10">
            <div className="mb-8">
                <h1 className="text-2xl font-medium text-slate-800">
                    Resultados para: <span className="text-indigo-600">"{query}"</span>
                </h1>
                <p className="text-slate-500 text-sm mt-1">{products.length} ofertas encontradas</p>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8 mb-20">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <p className="text-lg">Nenhum produto encontrado para esta busca.</p>
                </div>
            )}
        </main>
    )
}

export default function SearchPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Suspense fallback={<Loading />}>
                <SearchResults />
            </Suspense>
            <Footer />
        </div>
    )
}