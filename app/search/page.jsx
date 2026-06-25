import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Title from '@/components/Title'
import ProductGrid from '@/components/ProductGrid'
import Pagination from '@/components/Pagination'
import prisma from "@/lib/prisma";
 
const PRODUCTS_PER_PAGE = 12
 
export async function generateMetadata({ searchParams }) {
    const sParams = await searchParams
    const query = sParams?.q || ""
 
    return {
        title: query
            ? `Resultados para "${query}" | .PrismaOfertas`
            : "Buscar produtos | .PrismaOfertas",
    }
}
 
const SearchPage = async ({ searchParams }) => {
    const sParams = await searchParams
    const query = sParams?.q || ""
    const page = Math.max(1, Number(sParams?.page) || 1)
    const limit = PRODUCTS_PER_PAGE
 
    let products = []
    let total = 0
    let totalPages = 1
 
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?search=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
            { cache: 'no-store' }
        )
 
        if (res.ok) {
            const data = await res.json()
            products = data.products || []
            total = data.total || 0
            totalPages = data.totalPages || 1
        }
    } catch (error) {
        console.error("[SEARCH_PAGE_ERROR]", error)
    }
 
    return (
        <div className="flex flex-col min-h-screen">
            <Banner />
            <Navbar />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-10">
                    <Title
                        title={query ? `Resultados para "${query}"` : "Buscar produtos"}
                        description={
                            query
                                ? `${total} ${total === 1 ? 'produto encontrado' : 'produtos encontrados'}.`
                                : "Digite um termo na barra de busca para encontrar ofertas."
                        }
                        visibleButton={false}
                    />
                </div>
 
                <ProductGrid products={products} />
 
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    slug=""
                    basePath="/search"
                    extraParams={`q=${encodeURIComponent(query)}`}
                />
            </main>
            <Footer />
        </div>
    )
}
 
export default SearchPage