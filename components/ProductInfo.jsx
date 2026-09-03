'use client'
import { useState } from 'react'
import axios from 'axios'
import { formatCurrency } from '@/lib/utils'
import { ExternalLinkIcon, Share2Icon, CheckIcon } from 'lucide-react'

const ProductInfo = ({ product }) => {
  const [copied, setCopied] = useState(false)

  const handleProductClick = async () => {
    try {
      await axios.post('/api/analytics/click', { productId: product.id })
    } catch (error) {
      console.error("Erro ao registrar clique:", error)
    }
    window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer')
  }

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Olha essa oferta: ${product.name}`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        // Usuário cancelou o compartilhamento — não é um erro real
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.error("Erro ao copiar link:", error)
      }
    }
  }

  const hasDiscount = product.originalPrice
    && product.originalPrice > product.price

  const savedAmount = hasDiscount
    ? product.originalPrice - product.price
    : 0

  return (
    <div className='flex flex-col pb-28 sm:pb-0'>

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

      {/* Preços — com valor de economia em R$ */}
      <div className='flex flex-col mb-2'>
        {hasDiscount && (
          <span className='text-base text-red-400 line-through font-medium'>
            {formatCurrency(product.originalPrice)}
          </span>
        )}
        <span className='text-4xl sm:text-5xl font-black text-green-700 tracking-tighter'>
          {formatCurrency(product.price)}
        </span>
      </div>

      {hasDiscount && (
        <span className='inline-block w-fit bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full mb-6'>
          Você economiza {formatCurrency(savedAmount)}
        </span>
      )}

      {/* Botão CTA + Compartilhar — tamanho fixo, escondidos no mobile (sticky bar assume) */}
      <div className='hidden sm:flex items-center gap-3 mt-2'>
        <button
          onClick={handleProductClick}
          className='w-48 sm:w-55 flex items-center justify-center gap-2
                      bg-slate-700 text-white text-sm font-bold py-4 px-10
                      rounded-2xl hover:bg-gradient-to-r hover:text-white
                      hover:to-violet-400 hover:via-orange-400 hover:via-cyan-500
                      hover:from-red-400 hover:scale-[1.02]
                      active:scale-95 transition-all shadow-lg
                      shadow-slate-200 uppercase tracking-widest'
        >
          Ver na Loja
          <ExternalLinkIcon size={16} />
        </button>

        <button
          onClick={handleShare}
          title="Compartilhar"
          className='shrink-0 w-14 h-14 flex items-center justify-center
                      bg-slate-100 text-slate-600 rounded-2xl
                      hover:bg-slate-200 active:scale-95 transition-all'
        >
          {copied ? <CheckIcon size={18} className='text-green-600' /> : <Share2Icon size={18} />}
        </button>
      </div>

      {copied && (
        <span className='hidden sm:block text-xs text-green-600 mt-2'>Link copiado!</span>
      )}

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

      {/* Barra fixa no rodapé — SÓ NO MOBILE, mantém o CTA + compartilhar sempre acessíveis */}
      <div className='sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]'>
        <div className='flex items-center gap-3'>
          <span className='text-xl font-black text-green-700 tracking-tighter shrink-0'>
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={handleProductClick}
            className='flex-1 flex items-center justify-center gap-2
                        bg-slate-800 text-white text-xs font-bold py-3.5 px-4
                        rounded-xl uppercase tracking-widest active:scale-95 transition-all'
          >
            Ver na Loja
            <ExternalLinkIcon size={14} />
          </button>
          <button
            onClick={handleShare}
            title="Compartilhar"
            className='shrink-0 w-12 h-12 flex items-center justify-center
                        bg-slate-100 text-slate-600 rounded-xl active:scale-95 transition-all'
          >
            {copied ? <CheckIcon size={16} className='text-green-600' /> : <Share2Icon size={16} />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo