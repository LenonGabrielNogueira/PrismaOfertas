'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import Title from './Title';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Inscrição realizada com sucesso! 🎉' });
        setEmail('');
      } else {
        setStatus({ type: 'error', message: data.error || 'Erro ao inscrever. Tente novamente.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Erro de conexão. Verifique sua internet.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />

    <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-10">
                    <Title title="Fique por Dentro das Melhores Novidades!" description="Receba ofertas exclusivas diretamente no seu e-mail." visibleButton={false} />
                    <div className="h-[2px] mx-6 rounded-full bg-gradient-to-r from-red-400 via-cyan-500 to-violet-500"/>  
                    <div className="mt-12 text-slate-700 text-lg leading-relaxed">
                        <p className="text-center mb-4">
                            Bem-vindo à <span className="font-black text-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">.PrismaOfertas</span>. 
                            Se você chegou até aqui, é porque compartilha do mesmo desejo que nos move todos os dias: a busca pela excelência, pela inovação e pela 
                            praticidade de encontrar tudo o que você precisa em um só lugar, sem abrir mão das melhores ofertas do mercado.
                        </p>

                        <p className="text-center mb-4">
                            Na correria do dia a dia, é fácil perder aquela promoção especial ou o lançamento de um produto que você tanto queria. Pensando nisso, criamos uma Newsletter feita para quem gosta de economizar, descobrir novidades e comprar com mais inteligência.
                        </p>

                        <p className="text-center mb-4">
                            Não perca nenhuma promoção! Cadastre-se em nossa Newsletter e seja um dos primeiros a conhecer lançamentos, descontos especiais, campanhas sazonais e produtos que acabaram de chegar.
                        </p>
                        <p className="text-center mb-4">
                            O que você recebe ao se cadastrar?
                            <ul className="text-center list-disc list-inside mt-3 mb-4">
                                <li>✨ Promoções exclusivas para assinantes</li>
                                <li>🛍️ Novidades e lançamentos em primeira mão</li>
                                <li>💸 Descontos especiais e ofertas por tempo limitado</li>
                                <li>🎁 Dicas, tendências e recomendações de produtos</li>
                                <li>📦 Atualizações sobre campanhas e eventos da loja</li>
                            </ul>
                            Junte-se à nossa comunidade de compradores inteligentes e nunca mais perca uma oportunidade de economizar. Inscreva-se agora e transforme sua experiência de compra com a <span className="font-black text-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">.PrismaOfertas</span>!
                        </p>

                    </div>
                </div>
                <div className="h-[2px] mx-6 rounded-full bg-gradient-to-r from-red-400 via-cyan-500 to-violet-500"/>
                <div className="flex flex-col items-center mx-4 my-15">
                        <Title
                            title="Inscreva-se na Newsletter"
                            description="Digite seu melhor e-mail e comece a aproveitar vantagens exclusivas, ofertas imperdíveis e todas as novidades da nossa loja."
                            visibleButton={false}
                        />
                        
                        <form onSubmit={handleSubmit} className="flex bg-slate-100 text-sm p-1 rounded-full w-full max-w-xl my-10 border-2 border-white ring ring-slate-200">
                            <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu endereço de e-mail"
                            required
                            className="flex-1 pl-5 outline-none bg-transparent"
                            />
                            <button
                            type="submit"
                            disabled={loading}
                            className="w-48 sm:w-30 flex items-center justify-center gap-2
                                        bg-slate-700 text-white text-sm font-bold py-4 px-10
                                        rounded-2xl hover:bg-gradient-to-r hover:text-slate-900 
                                        hover:to-violet-400 hover:via-orange-400 hover:via-cyan-500 
                                        hover:from-red-400 hover:scale-[1.02]
                                        active:scale-95 transition-all shadow-lg
                                        shadow-slate-200 uppercase tracking-widest"
                            >
                            {loading ? 'Enviando...' : 'Enviar'}
                            </button>
                        </form>

                        {status.message && (
                            <div
                            className={`max-w-xl mx-auto mt-4 p-4 rounded-xl flex items-center gap-3 ${
                                status.type === 'success'
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                            }`}
                            >
                            {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                            <span>{status.message}</span>
                            </div>
                        )}
                        </div>
    </main>
    <Footer />
    </>
    
  );
};

export default Newsletter;