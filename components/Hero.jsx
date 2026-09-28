'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import CategoriesMarquee from './CategoriesMarquee'

const AUTOPLAY_MS = 5000

/* ─────────────────────────────────────────────────────────────
   SLIDES — edite aqui as ofertas, sem mexer no JSX.
   ⚠️ Mantenha só gatilhos verdadeiros (preços, PIX, frete etc.)
   ───────────────────────────────────────────────────────────── */
const slides = [
    {
        id: 'frete',
        tag: 'NOVIDADES',
        message: 'Frete grátis em compras acima de R$ 50!',
        title: 'Produtos que você vai amar. Preços em que você pode confiar.',
        priceLabel: 'Começa a partir de',
        price: '4,90',
        cta: 'OFERTAS SELECIONADAS',
        href: '/shop',
        bg: 'bg-cyan-100',
        badgeBg: 'bg-green-300/50',
        titleGradient: 'from-slate-800 via-slate-700 to-green-800',
        image: assets.hero_model_img,
        imageClass: 'sm:max-w-sm lg:max-w-md',
    },
    {
        id: 'oferta-do-dia',
        tag: 'OFERTA DO DIA',
        message: 'Os preços mudam à meia-noite',
        title: 'Só hoje: descontos que acabam em poucas horas.',
        priceLabel: 'Ofertas a partir de',
        price: '9,90',
        countdown: true,
        cta: 'VER OFERTAS',
        href: '/shop',
        bg: 'bg-violet-100',
        badgeBg: 'bg-violet-300/50',
        titleGradient: 'from-slate-800 via-slate-700 to-violet-800',
        image: assets.hero_product_img1,
        imageClass: 'sm:max-w-[16rem] lg:max-w-xs sm:mb-10',
    },
    {
        id: 'preco-ancora',
        tag: 'PROMOÇÃO',
        message: '10% OFF pagando no PIX',
        title: 'Pague menos e leve mais para casa.',
        priceLabel: 'De R$ 89,90 por apenas',
        price: '49,90',
        seal: '-45%',
        cta: 'APROVEITAR',
        href: '/shop',
        bg: 'bg-emerald-100',
        badgeBg: 'bg-emerald-300/50',
        titleGradient: 'from-slate-800 via-slate-700 to-emerald-800',
        image: assets.hero_product_img2,
        imageClass: 'sm:max-w-[16rem] lg:max-w-xs sm:mb-10',
    },
    {
        id: 'mais-vendidos',
        tag: 'MAIS VENDIDOS',
        message: 'Os favoritos da semana',
        title: 'O que todo mundo está comprando agora.',
        priceLabel: 'Confira os produtos',
        price: 'Top da semana',
        smallPrice: true,
        cta: 'VER MAIS VENDIDOS',
        href: '/shop',
        bg: 'bg-rose-100',
        badgeBg: 'bg-rose-300/50',
        titleGradient: 'from-slate-800 via-slate-700 to-rose-800',
        image: assets.hero_product_img1,
        imageClass: 'sm:max-w-[16rem] lg:max-w-xs sm:mb-10',
    },
]

/* Contador regressivo até o fim do dia (só roda no cliente → sem erro de hidratação) */
const Countdown = () => {
    const [left, setLeft] = useState(null)

    useEffect(() => {
        const tick = () => {
            const end = new Date()
            end.setHours(23, 59, 59, 999)
            setLeft(Math.max(0, end - new Date()))
        }
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])

    const total = left === null ? null : Math.floor(left / 1000)
    const values = total === null
        ? ['--', '--', '--']
        : [Math.floor(total / 3600), Math.floor((total % 3600) / 60), total % 60].map(n => String(n).padStart(2, '0'))
    const labels = ['h', 'min', 's']

    return (
        <div>
            <p className='text-xs uppercase tracking-tighter font-semibold opacity-70'>Termina em</p>
            <div className='flex items-center gap-1.5 sm:gap-2 mt-1'>
                {values.map((v, i) => (
                    <div key={labels[i]} className='flex items-baseline gap-0.5 bg-white/60 backdrop-blur border border-violet-200 rounded-lg px-2 sm:px-3 py-1'>
                        <span className='text-xl sm:text-3xl font-black tabular-nums'>{v}</span>
                        <span className='text-[10px] sm:text-xs font-semibold opacity-60'>{labels[i]}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

const Hero = () => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R$'

    // Autoplay só liga se o usuário não pediu "reduzir movimento"
    const [plugins, setPlugins] = useState([])
    const [autoplayOn, setAutoplayOn] = useState(false)
    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!reduce) {
            setPlugins([Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: false, stopOnMouseEnter: true })])
            setAutoplayOn(true)
        }
    }, [])

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins)
    const [selected, setSelected] = useState(0)

    const onSelect = useCallback(() => {
        if (emblaApi) setSelected(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi, onSelect])

    const scrollPrev = () => emblaApi?.scrollPrev()
    const scrollNext = () => emblaApi?.scrollNext()

    return (
        <div className='mx-4 sm:mx-6'>
            <style>{`@keyframes heroProgress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>

            <div className='flex max-xl:flex-col gap-4 sm:gap-8 max-w-7xl mx-auto my-6 sm:my-10'>

                {/* 🎠 CARD PRINCIPAL — agora é um carrossel (mesmo tamanho do original) */}
                <div
                    className='relative flex-1 flex flex-col border border-slate-200 rounded-2xl xl:min-h-100 group hover:border-slate-400 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden'
                    role='region'
                    aria-roledescription='carrossel'
                    aria-label='Destaques da loja'
                >
                    <div className='flex-1 overflow-hidden' ref={emblaRef}>
                        <div className='flex h-full touch-pan-y'>
                            {slides.map((s, i) => (
                                <div
                                    key={s.id}
                                    className={`relative flex-[0_0_100%] min-w-0 xl:min-h-100 ${s.bg}`}
                                    role='group'
                                    aria-roledescription='slide'
                                    aria-label={`${i + 1} de ${slides.length}`}
                                >
                                    {/* Slide inteiro clicável → loja */}
                                    <Link href={s.href} draggable={false} aria-label={s.title} className='absolute inset-0 z-10' />

                                    <div className='p-6 pb-12 sm:p-16 relative z-0'>
                                        {/* Badge + gatilho */}
                                        <div className={`inline-flex items-center gap-3 ${s.badgeBg} text-slate-700 pr-4 p-1 rounded-full text-xs sm:text-sm font-medium`}>
                                            <span className='bg-gradient-to-r from-red-400 via-orange-400 via-cyan-500 to-violet-400 text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-sm'>
                                                {s.tag}
                                            </span>
                                            {s.message}
                                            <ChevronRightIcon className='group-hover:translate-x-1 transition-transform' size={16} />
                                        </div>

                                        {/* Título com gradiente */}
                                        <h2 className={`text-3xl sm:text-6xl leading-[1.15] sm:leading-[1.1] my-3 sm:my-6 font-bold bg-gradient-to-r ${s.titleGradient} bg-clip-text text-transparent max-w-xs sm:max-w-lg`}>
                                            {s.title}
                                        </h2>

                                        {/* Preço / contador */}
                                        <div className='text-slate-800 mt-4 sm:mt-10 flex flex-wrap items-end gap-x-8 gap-y-4'>
                                            <div>
                                                <p className='text-xs uppercase tracking-tighter font-semibold opacity-70'>{s.priceLabel}</p>
                                                <p className={`${s.smallPrice ? 'text-2xl sm:text-4xl' : 'text-3xl sm:text-5xl'} font-black tracking-tight`}>
                                                    {s.smallPrice ? s.price : `${currency} ${s.price}`}
                                                </p>
                                            </div>
                                            {s.countdown && <Countdown />}
                                        </div>

                                        {/* CTA visual (span: o clique passa para o Link do slide) */}
                                        <span className='pointer-events-none inline-block bg-slate-800 text-white text-xs sm:text-sm font-bold py-3 sm:py-4 px-6 sm:px-10 mt-5 sm:mt-12 rounded-xl group-hover:bg-slate-900 group-hover:scale-105 transition-all shadow-xl uppercase tracking-wider'>
                                            {s.cta}
                                        </span>
                                    </div>

                                    {/* Selo de desconto */}
                                    {s.seal && (
                                        <div className='hidden sm:flex absolute top-8 right-8 z-0 items-center justify-center w-24 h-24 rounded-full bg-white/70 backdrop-blur border border-emerald-200 shadow-lg rotate-6'>
                                            <span className='text-2xl font-black text-emerald-800'>{s.seal}</span>
                                        </div>
                                    )}

                                    {/* Imagem — oculta no mobile, como no original */}
                                    <Image
                                        className={`hidden sm:block sm:absolute bottom-0 right-0 md:right-10 w-full object-contain pointer-events-none group-hover:scale-105 transition-transform duration-700 ${s.imageClass}`}
                                        src={s.image}
                                        alt={s.title}
                                        priority={i === 0}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Setas (desktop, aparecem no hover) */}
                    <button
                        type='button'
                        onClick={scrollPrev}
                        aria-label='Slide anterior'
                        className='hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur text-slate-800 shadow-md opacity-0 group-hover:opacity-100 hover:bg-white active:scale-95 transition-all'
                    >
                        <ChevronLeftIcon size={20} />
                    </button>
                    <button
                        type='button'
                        onClick={scrollNext}
                        aria-label='Próximo slide'
                        className='hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur text-slate-800 shadow-md opacity-0 group-hover:opacity-100 hover:bg-white active:scale-95 transition-all'
                    >
                        <ChevronRightIcon size={20} />
                    </button>

                    {/* Bolinhas (a ativa vira pílula) */}
                    <div className='absolute bottom-4 left-6 sm:left-16 z-20 flex items-center gap-2'>
                        {slides.map((s, i) => (
                            <button
                                key={s.id}
                                type='button'
                                onClick={() => emblaApi?.scrollTo(i)}
                                aria-label={`Ir para o slide ${i + 1}`}
                                aria-current={i === selected}
                                className={`h-2 rounded-full transition-all duration-300 ${i === selected ? 'w-6 bg-slate-800' : 'w-2 bg-slate-800/30 hover:bg-slate-800/60'}`}
                            />
                        ))}
                    </div>

                    {/* Barra de progresso até o próximo slide (pausa no hover) */}
                    {autoplayOn && (
                        <div className='absolute bottom-0 inset-x-0 h-1 bg-slate-800/10 z-20 pointer-events-none'>
                            <div
                                key={selected}
                                className='h-full bg-slate-800/60 origin-left group-hover:[animation-play-state:paused]'
                                style={{ animation: `heroProgress ${AUTOPLAY_MS}ms linear forwards` }}
                            />
                        </div>
                    )}
                </div>

                {/* 🟠 CARDS LATERAIS (ORANGE & BLUE) — inalterados */}
                <div className='grid grid-cols-2 gap-3 sm:flex sm:flex-col sm:gap-6 md:flex-row xl:flex-col w-full xl:max-w-sm text-sm'>
                    {/* Card Laranja */}
                    <Link href="/shop" className='flex-1 flex items-center justify-between w-full bg-orange-200 border border-orange-300 rounded-2xl p-4 sm:p-8 group hover:border-orange-400 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden'>
                        <div className="relative z-10">
                            <p className='text-lg sm:text-3xl font-bold bg-gradient-to-br from-slate-800 to-orange-800 bg-clip-text text-transparent max-w-[6rem] sm:max-w-40 leading-tight'>Melhores produtos</p>
                            <p className='flex items-center gap-1 mt-2 sm:mt-4 font-semibold text-slate-700 group-hover:text-slate-900 transition-colors text-xs sm:text-sm'>
                                Ver Mais <ArrowRightIcon className='group-hover:translate-x-1 transition-transform w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]' />
                            </p>
                        </div>
                        <Image className='w-14 sm:w-32 group-hover:scale-110 transition-transform duration-500' src={assets.hero_product_img1} alt="Ofertas Especiais" />
                    </Link>

                    {/* Card Azul */}
                    <Link href="/shop" className='flex-1 flex items-center justify-between w-full bg-blue-200 border border-blue-300 rounded-2xl p-4 sm:p-8 group hover:border-blue-400 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden'>
                        <div className="relative z-10">
                            <p className='text-lg sm:text-3xl font-bold bg-gradient-to-br from-slate-800 to-blue-800 bg-clip-text text-transparent max-w-[6rem] sm:max-w-40 leading-tight'>Grandes descontos</p>
                            <p className='flex items-center gap-1 mt-2 sm:mt-4 font-semibold text-slate-700 group-hover:text-slate-900 transition-colors text-xs sm:text-sm'>
                                Ver Mais <ArrowRightIcon className='group-hover:translate-x-1 transition-transform w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]' />
                            </p>
                        </div>
                        <Image className='w-14 sm:w-32 group-hover:scale-110 transition-transform duration-500' src={assets.hero_product_img2} alt="Descontos Incríveis" priority />
                    </Link>
                </div>
            </div>

            {/* Espaçamento para o Marquee */}
            <div className="mt-8 sm:mt-12 mb-6">
                <CategoriesMarquee />
            </div>
        </div>
    )
}

export default Hero