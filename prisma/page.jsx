'use client'
import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Title from '@/components/Title'
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react' // Reutilizando ícones do Footer

export default function Contact() {
    return (
        <div className="flex flex-col min-h-screen">
            <Banner />
            <Navbar />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-10">
                    <Title title="Entre em Contato" description="Estamos aqui para ajudar!" visibleButton={false} />
                    <div className="mt-12 text-slate-700 text-lg leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-xl mb-4 text-slate-800">Fale Conosco</h3>
                            <p className="mb-4">
                                Tem alguma dúvida, sugestão ou precisa de suporte? Preencha o formulário abaixo ou utilize os contatos diretos.
                            </p>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nome</label>
                                    <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                                    <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">Mensagem</label>
                                    <textarea id="message" name="message" rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"></textarea>
                                </div>
                                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    Enviar Mensagem
                                </button>
                            </form>
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl mb-4 text-slate-800">Nossos Contatos</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-2">
                                    <MailIcon size={20} className="text-green-600" />
                                    <span>suporte@prismaofertas.com</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <PhoneIcon size={20} className="text-green-600" />
                                    <span>+55-48-9106-0485</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <MapPinIcon size={20} className="text-green-600" />
                                    <span>Av. Des. Lauro Linhares, 1015, Florianópolis - SC</span>
                                </li>
                            </ul>
                            <h3 className="font-semibold text-xl mb-4 mt-8 text-slate-800">Horário de Atendimento</h3>
                            <p>Segunda a Sexta: 9h às 18h</p>
                            <p>Sábado: 9h às 12h</p>
                            <p>Domingo: Fechado</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}