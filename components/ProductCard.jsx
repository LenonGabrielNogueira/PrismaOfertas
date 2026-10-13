'use client'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { formatCurrency } from '@/lib/utils'

// Gradiente da marca (indigo → fuchsia → rose → amber), usado só como detalhe
const BRAND_GRADIENT = 'linear-gradient(135deg, #6366f1, #d946ef, #f43f5e, #f59e0b)'

export default function ProductCard({ product }) {
    const imageSrc = product.images?.[0] ? product.images[0] : '/placeholder.png'
    const hasOriginalPrice = product.originalPrice && product.originalPrice > product.price

    const handleProductClick = (e) => {
        e.preventDefault()
        // Registra o clique sem esperar a resposta, para a loja abrir na hora
        // (evita bloqueio de pop-up em alguns navegadores)
        axios
            .post('/api/analytics/click', { productId: product.id })
            .catch((error) => console.error('Erro ao registrar clique:', error))
        window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer')
    }

    return (
        <article className="group relative flex flex-col bg-blue-50 rounded-lg overflow-hidden">
            <Link
                href={`/product/${product.id}`}
                className="flex flex-col flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-inset"
            >
                {/* Imagem quadrada */}
                <div className="relative aspect-square bg-white">
                    <Image
                        src={imageSrc}
                        alt={product.name || 'Produto'}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-contain p-3 sm:p-5"
                    />

                    {product.platform && (
                        <span className="absolute top-2 left-2 bg-cyan-50 border border-cyan-200 text-cyan-600 text-[11px] font-semibold px-1.5 py-0.5 rounded">
                            {product.platform}
                        </span>
                    )}

                    {product.discount > 0 && (
                        <span className="absolute top-2 right-2 bg-orange-50 border border-orange-200 text-orange-600 text-[11px] font-semibold px-1.5 py-0.5 rounded">
                            -{product.discount}%
                        </span>
                    )}
                </div>

                {/* Informações */}
                <div className="flex flex-col gap-1 px-3 pt-3 pb-3 sm:px-4 sm:pb-4 border-t bg-blue-50 border-slate-400">
                    <h3 className="text-[13px] sm:text-sm text-slate-900 font-medium leading-snug line-clamp-2">
                        {product.name}
                    </h3>

                    <div>
                        {hasOriginalPrice && (
                            <span className="block text-xs text-red-500 line-through">
                                {formatCurrency(product.originalPrice)}
                            </span>
                        )}
                        <span className="text-base sm:text-lg font-bold text-slate-900">
                            {formatCurrency(product.price)}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Botão discreto — só no desktop. No mobile, o toque no card abre a página do produto. */}
            <button
                type="button"
                onClick={handleProductClick}
                className="hidden sm:block mx-4 mb-4 border border-slate-500 bg-cyan-100 text-cyan-700 text-sm font-medium py-2 rounded-md transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-fuchsia-500 hover:to-amber-500 hover:border-transparent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
                Ver oferta
            </button>

            {/* Borda cinza fixa */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-lg border border-slate-400"
            />

            {/* Borda em gradiente da marca que envolve o card inteiro no hover */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    backgroundImage: BRAND_GRADIENT,
                    padding: '1.5px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                }}
            />
        </article>
    )
}