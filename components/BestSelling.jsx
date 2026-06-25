'use client'
import Title from './Title'
import ProductCard from './ProductCard'
import { PackageSearchIcon } from 'lucide-react'

const BestSelling = ({ products = [] }) => {

    const displayQuantity = 8

    // 🟢 Filtro OBRIGATÓRIO: Garante que apenas produtos com imagens válidas sejam renderizados
    const validProducts = products.filter(product => product.images && product.images.length > 0)
    
    // Calcula os produtos que serão de fato exibidos
    const visibleProducts = validProducts.slice(0, displayQuantity)

    return (
        <div className='px-6 my-20 sm:my-10 max-w-7xl mx-auto'>
            <Title 
                title='Produtos em Destaque' 
                description={`Os melhores achadinhos da Amazon e Shopee selecionados para você.`} 
                href='/shop' 
            />
            
            {visibleProducts.length > 0 ? (
                /* 🟢 Grid Ajustado: 2 colunas mobile, 3 tablet, 4 desktop com espaçamento generoso */
                <div className='mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-16'>
                    {visibleProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                /* 🟢 Estado visual amigável (Prevenção para banco vazio) */
                <div className="mt-12 flex flex-col items-center justify-center py-24 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                    <div className="bg-white p-6 rounded-full shadow-sm mb-4">
                        <PackageSearchIcon size={40} className="text-slate-300" />
                    </div>
                    <p className="text-slate-500 font-medium text-lg text-center">Em breve as melhores ofertas aparecerão aqui</p>
                    <p className="text-slate-400 text-sm mt-1 text-center px-6">Nossa curadoria está selecionando os melhores preços para você.</p>
                </div>
            )}
        </div>
    )
}

export default BestSelling