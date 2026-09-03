'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '@/components/Loading'
import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Title from '@/components/Title'
import CategorySection from '@/components/CategorySection'
import { PackageSearchIcon } from 'lucide-react'

export default function Shop() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchShopData = async () => {
        try {
            const response = await axios.get('/api/shop')
            setCategories(response.data.categories)
        } catch (error) {
            console.error("Erro ao carregar a loja:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchShopData()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="flex flex-col min-h-screen">
            <Banner />
            <Navbar />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-10">
                    <Title title="Nossa Loja" description="Explore todos os produtos disponíveis." visibleButton={false} />

                    {categories.length > 0 ? (
                        <div className="flex flex-col gap-16 mt-12">
                            {categories.map((category, index) => (
                                <CategorySection
                                    key={category.slug}
                                    categoryName={category.name}
                                    categorySlug={category.slug}
                                    products={category.products}
                                    totalCount={category.totalCount}
                                    reversed={index % 2 !== 0}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-12 flex flex-col items-center justify-center py-24 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                            <div className="bg-white p-6 rounded-full shadow-sm mb-4">
                                <PackageSearchIcon size={40} className="text-slate-300" />
                            </div>
                            <p className="text-slate-500 font-medium text-lg text-center">Em breve as melhores ofertas aparecerão aqui</p>
                            <p className="text-slate-400 text-sm mt-1 text-center px-6">Nossa curadoria está selecionando os melhores preços para você.</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}