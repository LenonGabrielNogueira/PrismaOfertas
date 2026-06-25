'use client'
import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Title from '@/components/Title'

export default function PrivacyPolicy() {
    return (
        <div className="flex flex-col min-h-screen">
            <Banner />
            <Navbar />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-10">
                    <Title title="Política de Privacidade" description="Como tratamos os seus dados na .PrismaOfertas" visibleButton={false} />
                    <div className="border-t-4 border-green-500 15px"></div>

                    <div className="mt-12 text-slate-700 text-lg leading-relaxed">

                        <p className="mb-4">
                            A sua privacidade é importante para nós. Esta Política de Privacidade explica de forma clara e transparente como a{" "}
                            <span className="font-black text-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">.PrismaOfertas</span>{" "}
                            coleta, utiliza, armazena e protege as informações dos visitantes e usuários do nosso site.
                        </p>

                        <p className="mb-4">
                            Ao navegar e utilizar nossos serviços, você concorda com as práticas descritas neste documento. Recomendamos a leitura completa para que você compreenda como tratamos os seus dados.
                        </p>

                        <div className="border-t-4 border-green-500 my-4 w-32"></div>

                        <p className="mb-4">
                            <span className="font-black text-xl block mb-2">1. Quem Somos</span>
                            A <span className="font-black text-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">.PrismaOfertas</span> é uma plataforma de curadoria de ofertas que atua no modelo de marketing de afiliados, conectando você aos melhores produtos disponíveis em marketplaces parceiros, como Amazon e Shopee. Não realizamos venda direta de produtos: ao clicar em "Ver na Loja", você é redirecionado ao site do parceiro responsável pela venda.
                        </p>

                        <div className="border-t-4 border-green-500 my-4 w-32"></div>

                        <p className="mb-4">
                            <span className="font-black text-xl block mb-2">2. Quais Dados Coletamos</span>
                            Para oferecer uma melhor experiência de navegação, coletamos algumas informações de forma automática, entre elas:
                        </p>
                        <p className="mb-4">
                            <span className="font-bold">Dados de navegação:</span> páginas visitadas, produtos visualizados, termos buscados e tempo de permanência no site.
                            <br />
                            <span className="font-bold">Dados técnicos:</span> endereço IP (armazenado de forma anonimizada/hash), tipo de navegador e dispositivo utilizado.
                            <br />
                            <span className="font-bold">Cookies e identificadores de sessão:</span> utilizados para manter o funcionamento adequado do site e personalizar sua experiência.
                            <br />
                            <span className="font-bold">Dados de cadastro:</span> caso você crie uma conta ou se inscreva em nossa newsletter, coletamos nome e e-mail informados voluntariamente.
                        </p>

                        <div className="border-t-4 border-green-500 my-4 w-32"></div>

                        <p className="mb-4">
                            <span className="font-black text-xl block mb-2">3. Como Utilizamos os Seus Dados</span>
                            As informações coletadas são utilizadas exclusivamente para:
                        </p>
                        <p className="mb-4">
                            Melhorar a experiência de navegação e a relevância das ofertas exibidas;
                            <br />
                            Analisar métricas internas, como produtos mais visualizados e termos mais buscados, para aprimorar nossa curadoria;
                            <br />
                            Enviar comunicações relacionadas à newsletter, caso você tenha se inscrito voluntariamente;
                            <br />
                            Garantir a segurança e o bom funcionamento técnico da plataforma.
                        </p>
                        <p className="mb-4">
                            Não vendemos, alugamos ou comercializamos os seus dados pessoais com terceiros para fins de marketing.
                        </p>

                        <div className="border-t-4 border-green-500 my-4 w-32"></div>

                        <p className="mb-4">
                            <span className="font-black text-xl block mb-2">4. Compartilhamento de Informações</span>
                            Como atuamos no modelo de afiliados, ao clicar em um produto você será redirecionado para o site do parceiro responsável pela venda (como Amazon ou Shopee). A partir desse momento, a política de privacidade aplicável passa a ser a do parceiro, e recomendamos a leitura dos termos de cada plataforma. A <span className="font-black bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">.PrismaOfertas</span> não tem acesso e não armazena dados de pagamento realizados nesses sites parceiros.
                        </p>

                        <div className="border-t-4 border-green-500 my-4 w-32"></div>

                        <p className="mb-4">
                            <span className="font-black text-xl block mb-2">5. Cookies</span>
                            Utilizamos cookies essenciais para o funcionamento do site, como manutenção de sessão e preferências de navegação. Você pode desativar os cookies diretamente nas configurações do seu navegador, embora isso possa afetar algumas funcionalidades da plataforma.
                        </p>

                        <div className="border-t-4 border-green-500 my-4 w-32"></div>

                        <p className="mb-4">
                            <span className="font-black text-xl block mb-2">6. Segurança dos Dados</span>
                            Adotamos medidas técnicas para proteger as informações coletadas, incluindo a anonimização de endereços IP através de hash criptográfico. Apesar dos nossos esforços, nenhum sistema é totalmente livre de riscos, e trabalhamos continuamente para manter os mais altos padrões de segurança.
                        </p>

                        <div className="border-t-4 border-green-500 my-4 w-32"></div>

                        <p className="mb-4">
                            <span className="font-black text-xl block mb-2">7. Seus Direitos</span>
                            Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:
                        </p>
                        <p className="mb-4">
                            Solicitar acesso aos dados que mantemos sobre você;
                            <br />
                            Solicitar a correção de dados incompletos ou desatualizados;
                            <br />
                            Solicitar a exclusão dos seus dados pessoais, como o cancelamento da inscrição na newsletter;
                            <br />
                            Revogar o consentimento dado anteriormente, a qualquer momento.
                        </p>

                        <div className="border-t-4 border-green-500 my-4 w-32"></div>

                        <p className="mb-4">
                            <span className="font-black text-xl block mb-2">8. Alterações Nesta Política</span>
                            Esta Política de Privacidade pode ser atualizada periodicamente para refletir melhorias em nossas práticas ou exigências legais. Recomendamos a revisão deste documento de tempos em tempos. A data da última atualização estará sempre indicada ao final desta página.
                        </p>

                        <div className="border-t-4 border-green-500 my-4 w-32"></div>

                        <p className="mb-4">
                            <span className="font-black text-xl block mb-2">9. Contato</span>
                            Caso tenha dúvidas, sugestões ou solicitações relacionadas à sua privacidade e aos seus dados, entre em contato através da nossa{" "}
                            <a href="/contato" className="text-green-600 font-semibold hover:underline">página de contato</a>.
                        </p>

                        <p className="mb-4 text-sm text-slate-400 mt-10">
                            Última atualização: Junho de 2026
                        </p>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
