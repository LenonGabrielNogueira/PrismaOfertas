'use client'
import axios from 'axios'
import { formatCurrency } from '@/lib/utils'
import { TruckIcon, ShieldCheckIcon, ExternalLinkIcon } from 'lucide-react'

const ProductInfo = ({ product }) => {

  const handleProductClick = async () => {
    try {
      await axios.post('/api/analytics/click', { productId: product.id })
    } catch (error) {
      console.error("Erro ao registrar clique:", error)
    }
    window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer')
  }

  const hasDiscount = product.originalPrice
    && product.originalPrice > product.price

  return (
    <div className='flex flex-col'>

      {/* Badges */}
      <div className='flex items-center gap-2 mb-4'>
        {product.platform && (
          <span className='bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-tight'>
            {product.platform}
          </span>
        )}
        {product.discount > 0 && (
          <span className='bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tight'>
            -{product.discount}% OFF
          </span>
        )}
      </div>

      {/* Nome */}
      <h1 className='text-3xl sm:text-4xl font-black text-slate-800 leading-tight mb-6'>
        {product.name}
      </h1>

      {/* Preços */}
      <div className='flex flex-col mb-8'>
        {hasDiscount && (
          <span className='text-base text-red-400 line-through font-medium'>
            {formatCurrency(product.originalPrice)}
          </span>
        )}
        <span className='text-4xl sm:text-5xl font-black text-green-700 tracking-tighter'>
          {formatCurrency(product.price)}
        </span>
      </div>

      {/* Botão CTA */}
      <button
        onClick={handleProductClick}
        className='w-48 sm:w-55 flex items-center justify-center gap-2
                    bg-slate-700 text-white text-sm font-bold py-4 px-10
                    rounded-2xl hover:bg-gradient-to-r hover:white 
                    hover:to-violet-400 hover:via-orange-400 hover:via-cyan-500 
                    hover:from-red-400 hover:scale-[1.02]
                    active:scale-95 transition-all shadow-lg
                    shadow-slate-200 uppercase tracking-widest'
      >
        Ver na Loja
        <ExternalLinkIcon size={16} />
      </button>

      {/* Garantias */}
      <div className='flex flex-col gap-3 mt-8 pt-8 border-t border-slate-100'>
        <div className='flex items-center gap-3 text-sm text-slate-700'>
          <TruckIcon size={18} className='text-cyan-600' />
          Frete calculado na loja do parceiro
        </div>
        <div className='flex items-center gap-3 text-sm text-slate-700'>
          <ShieldCheckIcon size={18} className='text-cyan-600' />
          Compra garantida pela plataforma {product.platform || 'parceira'}
        </div>
      </div>

      {/* Descrição */}
      {product.description && (
        <div className='mt-10 pt-8 border-t border-slate-100'>
          <h2 className='text-sm font-bold text-slate-800 uppercase tracking-wider mb-3'>
            Descrição
          </h2>
          <p className='text-slate-700 text-sm leading-relaxed whitespace-pre-line'>
            {product.description}
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductInfo