'use client'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { formatCurrency } from '@/lib/utils' // Assuming you have a utility for currency formatting

export default function ProductCard({ product }) {
    // 🟢 Resolução dos Erros 2 e 3: Tratamento defensivo para imagens
    const imageSrc = (product.images && product.images[0] && product.images[0] !== "") 
        ? product.images[0] 
        : "/placeholder.png"

    const handleProductClick = async (e) => {
        e.preventDefault() // Evita o comportamento de Link se clicado no botão
        try {
            await axios.post('/api/analytics/click', { productId: product.id })
        } catch (error) {
            console.error("Erro ao registrar clique:", error)
        }
        window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer')
    }

    return (
        <div className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm 
           hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 
           overflow-hidden flex flex-col h-[450px]" >
            <Link href={`/product/${product.id}`} className="block relative h-64 overflow-hidden bg-slate-50">
                {/* Imagem com zoom no hover */}
                <Image
                    src={imageSrc}
                    alt={product.name || "Produto"}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-400" 
                />
                
                {/* Badges Flutuantes */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                    {product.platform && (
                        <span className="bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-slate-100 uppercase tracking-tight">
                            {product.platform}
                        </span>
                    )}
                    {product.discount > 0 && (
                        <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-md uppercase tracking-tight">
                            -{product.discount}% OFF
                        </span>
                    )}
                </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
                {/* Título com limite de linhas */}
                <h3 className="text-slate-600 font-bold text-base leading-tight mb-4 line-clamp-2 group-hover:text-slate-800 transition-colors">
                    {product.name}
                </h3>
                
                <div className="mt-auto">
                    {/* Preços com hierarquia visual clara */}
                    <div className="flex flex-col mb-5">
                        {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-xs text-red-500 line-through font-medium">
                                {formatCurrency(product.originalPrice)}
                            </span>
                        )}
                        <span className="text-2xl font-black text-green-700 tracking-tighter">
                            {formatCurrency(product.price)}
                        </span>
                    </div>

                    {/* Botão de Ação Estilizado */}
                    <button 
                        onClick={handleProductClick} 
                            className="w-full bg-cyan-100 text-cyan-800 text-xs font-bold py-4
                            px-4
                            rounded-2xl
                            uppercase
                            tracking-widest
                            transition-all
                            duration-300
                            shadow-lg
                            shadow-slate-200
                            hover:bg-gradient-to-r
                            hover:text-white
                            hover:to-violet-400
                            hover:via-orange-400
                            hover:via-cyan-500
                            hover:from-red-400
                            hover:scale-[1.02]
                            active:scale-95
                            "
                    >
                        Ver na Loja
                    </button>
                </div>
            </div>
        </div>
    )
}