'use client'
import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Title from '@/components/Title'
import { MailIcon, PhoneIcon, MapPinIcon, ClockIcon } from 'lucide-react'

export default function Contact() {
    return (
        <div className="flex flex-col min-h-screen">
            <Banner />
            <Navbar />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-10">
                    <Title title="Entre em Contato" description="Estamos aqui para ajudar!" visibleButton={false} />

                    <div className="mt-10 grid md:grid-cols-[2fr_3fr] rounded-[2rem] overflow-hidden shadow-sm border border-slate-100">

                        {/* Painel escuro — contatos diretos + horário */}
                        <div className="bg-slate-800 text-slate-200 p-8 sm:p-10 flex flex-col justify-between">
                            <div>
                                <h3 className="font-semibold text-xl text-white mb-8">Nossos Contatos</h3>
                                <ul className="space-y-6">
                                    <li className="flex items-start gap-3">
                                        <span className="bg-white/10 rounded-full p-2 shrink-0">
                                            <MailIcon size={18} className="text-cyan-300" />
                                        </span>
                                        <span className="pt-1.5 text-sm">suporte@prismaofertas.com</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-white/10 rounded-full p-2 shrink-0">
                                            <PhoneIcon size={18} className="text-cyan-300" />
                                        </span>
                                        <span className="pt-1.5 text-sm">+55 48 9106-0485</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="bg-white/10 rounded-full p-2 shrink-0">
                                            <MapPinIcon size={18} className="text-cyan-300" />
                                        </span>
                                        <span className="pt-1.5 text-sm">Av. Des. Lauro Linhares, 1015, Florianópolis - SC</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-10 pt-8 border-t border-white/10">
                                <div className="flex items-center gap-2 mb-4">
                                    <ClockIcon size={16} className="text-cyan-300" />
                                    <h3 className="font-semibold text-sm text-white">Horário de Atendimento</h3>
                                </div>
                                <dl className="space-y-1.5 text-sm text-slate-300">
                                    <div className="flex justify-between">
                                        <dt>Segunda a Sexta</dt>
                                        <dd>9h às 18h</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt>Sábado</dt>
                                        <dd>9h às 12h</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt>Domingo</dt>
                                        <dd className="text-slate-500">Fechado</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* Formulário — painel claro */}
                        <div className="bg-white p-8 sm:p-10">
                            <h3 className="font-semibold text-xl mb-2 text-slate-800">Fale Conosco</h3>
                            <p className="text-slate-500 text-sm mb-8">
                                Tem alguma dúvida, sugestão ou precisa de suporte? Preencha o formulário abaixo.
                            </p>
                            <form className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Nome</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">Mande Sua Mensagem</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        className="block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm shadow-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-colors resize-none"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto inline-flex justify-center items-center py-3 px-8
                                        rounded-xl text-sm font-bold text-white bg-slate-800
                                        hover:bg-gradient-to-r hover:text-white
                                        hover:to-violet-400 hover:via-orange-400 hover:via-cyan-500
                                        hover:from-red-400 hover:scale-[1.02]
                                        active:scale-95 transition-all"
                                >
                                    Enviar Mensagem
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}