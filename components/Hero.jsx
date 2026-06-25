'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R$'

    return (
        <div className='mx-6'>
            <div className='flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10'>
                {/* 🟢 CARD PRINCIPAL (GREEN/SLATE) */}
                <div className='relative flex-1 flex flex-col bg-cyan-100 rounded-[2.5rem] xl:min-h-100 group cursor-pointer hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden'>
                    <Link href="/shop" className="absolute inset-0 z-10" />
                    <div className='p-8 sm:p-16 relative z-0'>
                        {/* Badge de Novidades */}
                        <div className='inline-flex items-center gap-3 bg-green-300/50 text-slate-700 pr-4 p-1 rounded-full text-xs sm:text-sm font-medium'>
                            <span className='bg-gradient-to-r from-red-400 via-orange-400 via-cyan-500 to-violet-400 text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-sm'>
                                NOVIDADES
                            </span> 
                            Frete grátis em compras acima de R$ 50! 
                            <ChevronRightIcon className='group-hover:translate-x-1 transition-transform' size={16} />
                        </div>

                        {/* Título com Gradiente Refinado */}
                        <h2 className='text-4xl sm:text-6xl leading-[1.1] my-4 sm:my-6 font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-green-800 bg-clip-text text-transparent max-w-xs sm:max-w-lg'>
                            Produtos que você vai amar. Preços em que você pode confiar.
                        </h2>

                        {/* Preço Chamativo */}
                        <div className='text-slate-800 mt-6 sm:mt-10'>
                            <p className="text-xs uppercase tracking-tighter font-semibold opacity-70">Começa a partir de</p>
                            <p className='text-4xl sm:text-5xl font-black tracking-tight'>{currency} 4.90</p>
                        </div>

                        <button className='bg-slate-800 text-white text-sm font-bold py-4 px-10 mt-8 sm:mt-12 rounded-xl hover:bg-slate-900 hover:scale-105 active:scale-95 transition-all shadow-xl relative z-20 uppercase tracking-wider'>
                            SAIBA MAIS
                        </button>
                    </div>
                    
                    {/* Imagem do Modelo com Parallax suave no hover */}
                    <Image className='sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm lg:max-w-md object-contain pointer-events-none group-hover:scale-105 transition-transform duration-700' src={assets.hero_model_img} alt="Promoção Destaque" priority />
                </div>

                {/* 🟠 CARDS LATERAIS (ORANGE & BLUE) */}
                <div className='flex flex-col md:flex-row xl:flex-col gap-6 w-full xl:max-w-sm text-sm'>
                    {/* Card Laranja */}
                    <Link href="/shop" className='flex-1 flex items-center justify-between w-full bg-orange-200 rounded-[2rem] p-8 group hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden'>
                        <div className="relative z-10">
                            <p className='text-3xl font-bold bg-gradient-to-br from-slate-800 to-orange-800 bg-clip-text text-transparent max-w-40 leading-tight'>Melhores produtos</p>
                            <p className='flex items-center gap-1 mt-4 font-semibold text-slate-700 group-hover:text-slate-900 transition-colors'>Ver Mais <ArrowRightIcon className='group-hover:translate-x-1 transition-transform' size={18} /> </p>
                        </div>
                        <Image className='w-32 group-hover:scale-110 transition-transform duration-500' src={assets.hero_product_img1} alt="Ofertas Especiais" />
                    </Link>

                    {/* Card Azul */}
                    <Link href="/shop" className='flex-1 flex items-center justify-between w-full bg-blue-200 rounded-[2rem] p-8 group hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden'>
                        <div className="relative z-10">
                            <p className='text-3xl font-bold bg-gradient-to-br from-slate-800 to-blue-800 bg-clip-text text-transparent max-w-40 leading-tight'>Grandes descontos</p>
                            <p className='flex items-center gap-1 mt-4 font-semibold text-slate-700 group-hover:text-slate-900 transition-colors'>Ver Mais <ArrowRightIcon className='group-hover:translate-x-1 transition-transform' size={18} /> </p>
                        </div>
                        <Image className='w-32 group-hover:scale-110 transition-transform duration-500' src={assets.hero_product_img2} alt="Descontos Incríveis" priority />
                    </Link>
                </div>
            </div>
            
            {/* Espaçamento para o Marquee */}
            <div className="mt-12 mb-6">
                <CategoriesMarquee />
            </div>
        </div>
    )
}

export default Hero