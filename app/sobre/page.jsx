'use client'
import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Title from '@/components/Title'

export default function About() {
    return (
        <div className="flex flex-col min-h-screen">
            <Banner />
            <Navbar />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-10">
                    <Title title="Sobre Nós" description="Conheça a .PrismaOfertas" visibleButton={false} />
                    <div class="border-t-4 border-green-500 15px"></div>   
                    <div className="mt-12 text-slate-700 text-lg leading-relaxed">
                        <p className="mb-4">
                            A Sua Jornada de Compras Começa Aqui
                            Bem-vindo à <span className="font-black text-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">.PrismaOfertas</span>. Se você chegou até aqui, é porque compartilha do mesmo desejo que nos move todos os dias: a busca pela excelência, pela inovação e pela 
                            praticidade de encontrar tudo o que você precisa em um só lugar, sem abrir mão das melhores ofertas do mercado.
                        </p>
                        
                        <p className="mb-4">Nós não somos apenas mais uma loja virtual no meio da multidão. Somos uma plataforma desenhada sob medida para quem valoriza o tempo, o dinheiro e, 
                            acima de tudo, a experiência de comprar com total segurança e satisfação. Nascemos com o propósito claro de descomplicar o e-commerce e de provar que é possível, sim, 
                            unir o maior catálogo do mercado a preços que cabem no seu bolso, com um atendimento que realmente se importa com você.
                        </p>
                        <div className="border-t-4 border-green-500 15px my-4 w-32"></div>
                        <p className="mb-4">
                            <p><span className="font-black text-xl">A Nossa História: Como Tudo Começou</span></p>
                            Toda grande marca nasce de uma inquietação. A <span className="font-black text-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">.PrismaOfertas</span> surgiu quando percebemos que o comércio eletrônico estava se tornando frio, automático e distante.
                            As pessoas encontravam variedade, mas não encontravam suporte. Encontravam preços baixos, mas duvidavam da qualidade. Diante desse cenário, decidimos criar 
                            algo totalmente diferente.
                        </p>
                            
                        <p className="mb-4">
                            Reunimos uma equipe de apaixonados por tecnologia, logística e atendimento ao cliente com uma missão única: construir o e-commerce definitivo. Um espaço 
                            onde o cliente não fosse apenas um número de pedido, mas o protagonista. Desde o primeiro dia, mergulhamos de cabeça no mercado para entender o que você 
                            realmente procura, como prefere receber seus produtos e de que forma podemos superar suas expectativas a cada novo clique.
                        </p>
                            
                        <p className="mb-4">
                            Hoje, olhamos para trás com orgulho do caminho que trilhamos, mas sempre com os olhos fixos no futuro. O mercado muda, as tendências evoluem, mas o nosso 
                            compromisso com a sua satisfação continua exatamente o mesmo.
                            Por Que Somos Especialistas No Que Fazemos?
                            Dizer que somos bons no que fazemos é fácil; provar isso em cada detalhe é o que nos diferencia. A nossa excelência não acontece por acaso. Ela é o resultado 
                            de um trabalho incansável de curadoria, testes rigorosos e negociações diretas com os melhores fornecedores do planeta.
                        </p>
                            <div className="border-t-4 border-green-500 15px my-4 w-32"></div>
                        <p className="mb-4">
                            <p><span className="font-black text-xl">Curadoria Inteligente:</span></p> Nós não enchemos nossas prateleiras virtuais com qualquer produto. Cada item disponível em nosso site passa por uma análise criteriosa de qualidade, durabilidade e utilidade. Se não for excelente para nós, não serve para você.
                            As Melhores Ofertas, De Verdade: Nosso time comercial é obcecado por custo-benefício. Negociamos em grande escala para garantir que as margens se transformem em descontos reais no seu carrinho. Aqui, a economia é garantida sem que você precise abrir mão da qualidade.
                            Logística de Alta Performance: Sabemos que a ansiedade bate forte depois de finalizar uma compra. Por isso, investimos nas melhores tecnologias de separação e envio para que o seu produto chegue até a sua casa com a máxima agilidade, rastreabilidade e segurança.
                            Atendimento Humanizado: Se você tiver uma dúvida, um problema ou precisar de uma sugestão, você não falará com robôs genéricos que não resolvem nada. Nossa equipe de suporte é composta por pessoas reais, prontas para ouvir, entender e resolver o que você precisar com empatia e rapidez.
                        </p>

                        <p className="mb-4">  
                            <div className="border-t-4 border-green-500 my-4 15px w-32"></div>
                            O Que Nos Move: Missão, Visão e Valores
                            Para guiar os nossos passos e garantir que nunca perderemos a nossa essência, estabelecemos pilares sólidos que ditam o ritmo do nosso crescimento:
                        </p>

                        <p className="mb-4">
                            <p><span className="font-black text-xl">Nossa Missão:</span></p> Oferecer a maior variedade de produtos do mercado com as ofertas mais competitivas da internet, proporcionando uma experiência de compra online que seja simples, rápida, segura e profundamente satisfatória.
                            
                            <p><span className="font-black text-xl">Nossa Visão:</span></p> Ser reconhecidos globalmente como o e-commerce de referência em confiabilidade, inovação e atendimento ao cliente, mantendo sempre o espírito dinâmico e focado na evolução contínua.
                            
                            <p><span className="font-black text-xl">Nossos Valores:</span></p> Transparência em todas as relações, obsessão pela satisfação do cliente, ética inegociável, inovação constante e paixão em fazer a diferença na vida das pessoas através de produtos incríveis.
                            
                        </p>

                        <p className="mb-4">
                           <div className="border-t-4 border-green-500 my-4 15px w-32"></div>
                           <p><span className="font-black text-xl">Tudo Que Você Procura Está A Um Clique De Distância:</span></p>
                            Seja para renovar o seu estilo, transformar a sua casa, adquirir a tecnologia mais recente do mercado ou presentear alguém especial: não importa o seu objetivo, a <span className="font-black text-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">.PrismaOfertas</span> foi feita para você. Nós mapeamos as suas 
                            necessidades cotidianas e os seus desejos mais profundos para garantir que, ao navegar pelas nossas categorias, você sinta que o site foi customizado para os seus gostos.
                            Não perca mais tempo navegando em dezenas de sites diferentes, pagando fretes separados e se desgastando com processos de compra complexos. Nós centralizamos tudo o que há de melhor na internet em uma vitrine limpa, intuitiva e moderna.
                            Faça Parte da Nossa Comunidade
                            Mais do que clientes, nós construímos uma comunidade de compradores inteligentes. Pessoas que sabem o valor do seu dinheiro e que não aceitam nada menos do que a perfeição na hora de investir em si mesmas e em suas famílias.
                            Convidamos você a explorar o nosso site, aproveitar as nossas ofertas exclusivas e vivenciar na pele o padrão de qualidade que nos tornou referência no mercado. <p>Seja muito bem-vindo à <span className="font-black text-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient ">.PrismaOfertas</span>. Nós estamos aqui por você, para você e com você.</p> 
                            <p>Boas compras!</p>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
