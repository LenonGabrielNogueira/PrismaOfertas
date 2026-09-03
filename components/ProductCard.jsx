'use client'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { formatCurrency } from '@/lib/utils'

export default function ProductCard({ product }) {
    const imageSrc = (product.images && product.images[0] && product.images[0] !== "") 
        ? product.images[0] 
        : "/placeholder.png"

    const handleProductClick = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/analytics/click', { productId: product.id })
        } catch (error) {
            console.error("Erro ao registrar clique:", error)
        }
        window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer')
    }

    return (
        <div className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-[450px]" >
            <Link href={`/product/${product.id}`} className="block relative h-64 overflow-hidden bg-slate-50">
                {/* Imagem com zoom no hover */}
                <Image
                    src={imageSrc}
                    alt={product.name || "Produto"}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-400" 
                />

                {/* Badges Flutuantes — SÓ NO DESKTOP (sm e acima). No mobile ficam escondidos. */}
                <div className="hidden sm:flex absolute top-4 left-4 right-4 justify-between items-start pointer-events-none">
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
                    {/* Selos de Plataforma/Desconto — SÓ NO MOBILE, estilo quadrado minimalista */}
                    {(product.platform || product.discount > 0) && (
                        <div className="flex sm:hidden items-center gap-1.5 mb-2">
                            {product.platform && (
                                <span className="border border-slate-200 text-slate-500 text-[9px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-tight">
                                    {product.platform}
                                </span>
                            )}
                            {product.discount > 0 && (
                                <span className="bg-orange-50 border border-orange-200 text-orange-600 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-tight">
                                    -{product.discount}%
                                </span>
                            )}
                        </div>
                    )}

                    {/* Preços — versão MOBILE: menores, com quebra automática se não couber */}
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1 sm:hidden">
                        {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-[11px] text-red-400 line-through font-medium">
                                {formatCurrency(product.originalPrice)}
                            </span>
                        )}
                        <span className="text-lg font-black text-green-700 tracking-tight">
                            {formatCurrency(product.price)}
                        </span>
                    </div>

                    {/* Preços — versão DESKTOP: igual ao original, empilhados e maiores */}
                    <div className="hidden sm:flex sm:flex-col mb-5">
                        {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-xs text-red-500 line-through font-medium">
                                {formatCurrency(product.originalPrice)}
                            </span>
                        )}
                        <span className="text-2xl font-black text-green-700 tracking-tighter">
                            {formatCurrency(product.price)}
                        </span>
                    </div>

                    {/* Botão de Ação Estilizado — SÓ NO DESKTOP. No mobile, o clique na imagem já leva pra página do produto, que tem seu próprio botão. */}
                    <button 
                        onClick={handleProductClick} 
                            className="hidden sm:block w-full bg-cyan-100 text-cyan-800 text-xs font-bold py-4
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