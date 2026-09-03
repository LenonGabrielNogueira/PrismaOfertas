'use client'
import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Title from '@/components/Title'

const SECTIONS = [
    { id: 'quem-somos', label: '1. Quem Somos' },
    { id: 'dados-coletados', label: '2. Dados Coletados' },
    { id: 'uso-dos-dados', label: '3. Como Usamos' },
    { id: 'compartilhamento', label: '4. Compartilhamento' },
    { id: 'cookies', label: '5. Cookies' },
    { id: 'seguranca', label: '6. Segurança' },
    { id: 'seus-direitos', label: '7. Seus Direitos' },
    { id: 'alteracoes', label: '8. Alterações' },
    { id: 'contato', label: '9. Contato' },
]

export default function PrivacyPolicy() {
    return (
        <div className="flex flex-col min-h-screen">
            <Banner />
            <Navbar />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-10">
                    <Title title="Política de Privacidade" description="Como tratamos os seus dados na .PrismaOfertas" visibleButton={false} />

                    <div className="mt-10 grid md:grid-cols-[220px_1fr] gap-10">

                        {/* Sumário — fixo no desktop, escondido no mobile */}
                        <aside className="hidden md:block">
                            <div className="sticky top-24">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                                    Neste documento
                                </p>
                                <nav className="flex flex-col gap-2.5 border-l-2 border-slate-100 pl-4">
                                    {SECTIONS.map((section) => (
                                         <a key={section.id}
                                            href={`#${section.id}`}
                                            className="text-sm text-slate-500 hover:text-cyan-600 transition-colors">
                                            {section.label}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        {/* Conteúdo */}
                        <div className="max-w-2xl text-slate-700 text-base leading-relaxed">

                            <p className="mb-4">
                                A sua privacidade é importante para nós. Esta Política de Privacidade explica de forma clara e transparente como a{" "}
                                <span className="font-black bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">.PrismaOfertas</span>{" "}
                                coleta, utiliza, armazena e protege as informações dos visitantes e usuários do nosso site.
                            </p>

                            <p className="mb-10">
                                Ao navegar e utilizar nossos serviços, você concorda com as práticas descritas neste documento. Recomendamos a leitura completa para que você compreenda como tratamos os seus dados.
                            </p>

                            <section id="quem-somos" className="pb-8 mb-8 border-b border-slate-100">
                                <h2 className="font-black text-xl text-slate-800 mb-3">1. Quem Somos</h2>
                                <p>
                                    A <span className="font-black bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">.PrismaOfertas</span> é uma plataforma de curadoria de ofertas que atua no modelo de marketing de afiliados, conectando você aos melhores produtos disponíveis em marketplaces parceiros, como Amazon e Shopee. Não realizamos venda direta de produtos: ao clicar em "Ver na Loja", você é redirecionado ao site do parceiro responsável pela venda.
                                </p>
                            </section>

                            <section id="dados-coletados" className="pb-8 mb-8 border-b border-slate-100">
                                <h2 className="font-black text-xl text-slate-800 mb-3">2. Quais Dados Coletamos</h2>
                                <p className="mb-4">
                                    Para oferecer uma melhor experiência de navegação, coletamos algumas informações de forma automática, entre elas:
                                </p>
                                <ul className="space-y-2 list-disc list-inside marker:text-cyan-500">
                                    <li><span className="font-semibold">Dados de navegação:</span> páginas visitadas, produtos visualizados, termos buscados e tempo de permanência no site.</li>
                                    <li><span className="font-semibold">Dados técnicos:</span> endereço IP (armazenado de forma anonimizada/hash), tipo de navegador e dispositivo utilizado.</li>
                                    <li><span className="font-semibold">Cookies e identificadores de sessão:</span> utilizados para manter o funcionamento adequado do site e personalizar sua experiência.</li>
                                    <li><span className="font-semibold">Dados de cadastro:</span> caso você crie uma conta ou se inscreva em nossa newsletter, coletamos nome e e-mail informados voluntariamente.</li>
                                </ul>
                            </section>

                            <section id="uso-dos-dados" className="pb-8 mb-8 border-b border-slate-100">
                                <h2 className="font-black text-xl text-slate-800 mb-3">3. Como Utilizamos os Seus Dados</h2>
                                <p className="mb-4">
                                    As informações coletadas são utilizadas exclusivamente para:
                                </p>
                                <ul className="space-y-2 list-disc list-inside marker:text-cyan-500 mb-4">
                                    <li>Melhorar a experiência de navegação e a relevância das ofertas exibidas;</li>
                                    <li>Analisar métricas internas, como produtos mais visualizados e termos mais buscados, para aprimorar nossa curadoria;</li>
                                    <li>Enviar comunicações relacionadas à newsletter, caso você tenha se inscrito voluntariamente;</li>
                                    <li>Garantir a segurança e o bom funcionamento técnico da plataforma.</li>
                                </ul>
                                <p>
                                    Não vendemos, alugamos ou comercializamos os seus dados pessoais com terceiros para fins de marketing.
                                </p>
                            </section>

                            <section id="compartilhamento" className="pb-8 mb-8 border-b border-slate-100">
                                <h2 className="font-black text-xl text-slate-800 mb-3">4. Compartilhamento de Informações</h2>
                                <p>
                                    Como atuamos no modelo de afiliados, ao clicar em um produto você será redirecionado para o site do parceiro responsável pela venda (como Amazon ou Shopee). A partir desse momento, a política de privacidade aplicável passa a ser a do parceiro, e recomendamos a leitura dos termos de cada plataforma. A <span className="font-black bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">.PrismaOfertas</span> não tem acesso e não armazena dados de pagamento realizados nesses sites parceiros.
                                </p>
                            </section>

                            <section id="cookies" className="pb-8 mb-8 border-b border-slate-100">
                                <h2 className="font-black text-xl text-slate-800 mb-3">5. Cookies</h2>
                                <p>
                                    Utilizamos cookies essenciais para o funcionamento do site, como manutenção de sessão e preferências de navegação. Você pode desativar os cookies diretamente nas configurações do seu navegador, embora isso possa afetar algumas funcionalidades da plataforma.
                                </p>
                            </section>

                            <section id="seguranca" className="pb-8 mb-8 border-b border-slate-100">
                                <h2 className="font-black text-xl text-slate-800 mb-3">6. Segurança dos Dados</h2>
                                <p>
                                    Adotamos medidas técnicas para proteger as informações coletadas, incluindo a anonimização de endereços IP através de hash criptográfico. Apesar dos nossos esforços, nenhum sistema é totalmente livre de riscos, e trabalhamos continuamente para manter os mais altos padrões de segurança.
                                </p>
                            </section>

                            <section id="seus-direitos" className="pb-8 mb-8 border-b border-slate-100">
                                <h2 className="font-black text-xl text-slate-800 mb-3">7. Seus Direitos</h2>
                                <p className="mb-4">
                                    Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:
                                </p>
                                <ul className="space-y-2 list-disc list-inside marker:text-cyan-500">
                                    <li>Solicitar acesso aos dados que mantemos sobre você;</li>
                                    <li>Solicitar a correção de dados incompletos ou desatualizados;</li>
                                    <li>Solicitar a exclusão dos seus dados pessoais, como o cancelamento da inscrição na newsletter;</li>
                                    <li>Revogar o consentimento dado anteriormente, a qualquer momento.</li>
                                </ul>
                            </section>

                            <section id="alteracoes" className="pb-8 mb-8 border-b border-slate-100">
                                <h2 className="font-black text-xl text-slate-800 mb-3">8. Alterações Nesta Política</h2>
                                <p>
                                    Esta Política de Privacidade pode ser atualizada periodicamente para refletir melhorias em nossas práticas ou exigências legais. Recomendamos a revisão deste documento de tempos em tempos. A data da última atualização estará sempre indicada ao final desta página.
                                </p>
                            </section>

                            <section id="contato" className="pb-8">
                                <h2 className="font-black text-xl text-slate-800 mb-3">9. Contato</h2>
                                <p>
                                    Caso tenha dúvidas, sugestões ou solicitações relacionadas à sua privacidade e aos seus dados, entre em contato através da nossa{" "}
                                    <a href="/contato" className="text-cyan-600 font-semibold hover:underline">página de contato</a>.
                                </p>
                            </section>

                            <p className="text-sm text-slate-400 mt-4">
                                Última atualização: Junho de 2026
                            </p>

                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}