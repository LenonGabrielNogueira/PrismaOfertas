'use client'
import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { SearchCheck, Tag, Truck, HeartHandshake, Target, Eye, Gem } from 'lucide-react'

const TIMELINE = [
    {
        title: 'O incômodo',
        text: 'Percebemos que o e-commerce estava ficando frio e automático. Tinha variedade, mas faltava suporte. Tinha preço baixo, mas faltava confiança.',
    },
    {
        title: 'A decisão',
        text: 'Reunimos gente apaixonada por tecnologia, logística e atendimento com uma missão só: fazer o cliente ser o protagonista, não um número de pedido.',
    },
    {
        title: 'O aprendizado',
        text: 'Mergulhamos no mercado pra entender o que você realmente procura, como prefere receber seus produtos e onde podíamos fazer diferente.',
    },
    {
        title: 'Hoje',
        text: 'O mercado muda, as tendências evoluem — mas o compromisso com quem compra da gente continua exatamente o mesmo.',
    },
]

const PILLARS = [
    {
        icon: SearchCheck,
        title: 'Curadoria Inteligente',
        text: 'Cada produto passa por uma análise de qualidade, durabilidade e utilidade antes de entrar no catálogo. Se não for bom pra gente, não entra pra você.',
        accent: 'text-cyan-600 bg-cyan-50',
        span: 'md:col-span-2',
    },
    {
        icon: Tag,
        title: 'Ofertas Reais',
        text: 'Negociamos em escala pra transformar margem em desconto de verdade no seu carrinho.',
        accent: 'text-orange-600 bg-orange-50',
        span: '',
    },
    {
        icon: Truck,
        title: 'Logística de Alta Performance',
        text: 'Separação e envio rápidos, com rastreabilidade do início ao fim.',
        accent: 'text-orange-600 bg-orange-50',
        span: '',
    },
    {
        icon: HeartHandshake,
        title: 'Atendimento Humanizado',
        text: 'Sem robô genérico. Se você precisar de ajuda, fala com gente de verdade, disposta a resolver.',
        accent: 'text-cyan-600 bg-cyan-50',
        span: 'md:col-span-2',
    },
]

export default function About() {
    return (
        <div className="flex flex-col min-h-screen">
            <Banner />
            <Navbar />
            <main className="flex-grow">

                {/* HERO */}
                <section className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 pt-14 pb-16">
                    <p className="text-sm font-semibold text-cyan-600 mb-4">Sobre a .PrismaOfertas</p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-800 leading-[1.05] tracking-tight max-w-3xl">
                        Comprar bem não devia ser um trabalho de detetive.
                    </h1>
                    <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
                        A gente centraliza a curadoria, a negociação e o suporte — pra você não precisar
                        abrir dez abas diferentes só pra achar um produto bom, no preço certo.
                    </p>
                </section>

                {/* LINHA DO TEMPO — seção escura, quebra o ritmo do resto do site */}
                <section className="bg-slate-900 text-slate-300">
                    <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 sm:py-20">
                        <h2 className="text-2xl sm:text-3xl font-black text-white mb-12">
                            Como tudo começou
                        </h2>

                        <div className="relative border-l-2 border-slate-700 pl-8 space-y-12">
                            {TIMELINE.map((step) => (
                                <div key={step.title} className="relative">
                                    <span className="absolute -left-[calc(2rem+5px)] top-1 w-3 h-3 rounded-full bg-cyan-400" />
                                    <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                                    <p className="text-slate-400 leading-relaxed max-w-lg">{step.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* DIFERENCIAIS — grid assimétrico, não 4 cards idênticos */}
                <section className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-16 sm:py-20">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-3">
                        Por que confiar na curadoria da gente
                    </h2>
                    <p className="text-slate-500 max-w-lg mb-10">
                        Não é sorte, é processo — testado em cada detalhe antes de chegar até você.
                    </p>

                    <div className="grid md:grid-cols-3 gap-5">
                        {PILLARS.map((pillar) => (
                            <div
                                key={pillar.title}
                                className={`${pillar.span} border border-slate-100 rounded-[2rem] p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                            >
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${pillar.accent}`}>
                                    <pillar.icon size={20} />
                                </div>
                                <h3 className="font-bold text-lg text-slate-800 mb-2">{pillar.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{pillar.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* MISSÃO / VISÃO / VALORES — tratamento tipográfico distinto entre si */}
                <section className="bg-slate-50 border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-16 sm:py-20 grid md:grid-cols-3 gap-10">
                        <div>
                            <Target size={22} className="text-cyan-600 mb-4" />
                            <h3 className="font-bold text-slate-800 mb-2">Missão</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Oferecer a maior variedade de produtos com as ofertas mais competitivas da internet,
                                numa experiência simples, rápida e segura.
                            </p>
                        </div>
                        <div>
                            <Eye size={22} className="text-cyan-600 mb-4" />
                            <h3 className="font-bold text-slate-800 mb-2">Visão</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Ser referência em confiabilidade, inovação e atendimento — sempre em evolução,
                                nunca parados.
                            </p>
                        </div>
                        <div>
                            <Gem size={22} className="text-cyan-600 mb-4" />
                            <h3 className="font-bold text-slate-800 mb-2">Valores</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Transparência, obsessão pela satisfação do cliente, ética inegociável e paixão
                                por fazer a diferença.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FECHAMENTO */}
                <section className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-16 sm:py-20 text-center">
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-800 max-w-2xl mx-auto leading-tight">
                        Seja bem-vindo à{' '}
                        <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">
                            .PrismaOfertas
                        </span>
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-md mx-auto">
                        Estamos aqui por você, para você e com você. Boas compras!
                    </p>
                    <Link
                        href="/shop"
                        className="inline-block mt-8 bg-slate-800 text-white text-sm font-bold py-3.5 px-8
                            rounded-full hover:bg-gradient-to-r hover:text-white
                            hover:to-violet-400 hover:via-orange-400 hover:via-cyan-500
                            hover:from-red-400 hover:scale-[1.02]
                            active:scale-95 transition-all"
                    >
                        Explorar a loja
                    </Link>
                </section>
            </main>
            <Footer />
        </div>
    )
}