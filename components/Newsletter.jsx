'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const CATEGORY_EXAMPLES = [
  { label: 'Eletrônicos', discount: 'até 40%', rotate: '-rotate-3' },
  { label: 'Casa & Decoração', discount: 'até 30%', rotate: 'rotate-2' },
  { label: 'Moda', discount: 'até 50%', rotate: '-rotate-1' },
];

const PERKS = [
  'Descontos exclusivos pra quem assina',
  'Lançamentos antes de todo mundo',
  'Só oferta boa, sem enrolação',
  'Cancele quando quiser, sem burocracia',
];

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
        {/* HERO — headline + formulário de um lado, pilha de cupons do outro */}
        <section className="bg-slate-50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-16 md:py-24 grid md:grid-cols-[3fr_2fr] gap-12 md:gap-16 items-center">
            
            {/* Coluna de texto + formulário */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-800 leading-[1.05] tracking-tight">
                Oferta boa some rápido.
                <br />
                A gente avisa antes.
              </h1>

              <p className="mt-6 text-lg text-slate-600 max-w-md leading-relaxed">
                Assine e receba os melhores descontos da{' '}
                <span className="font-black bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">
                  .PrismaOfertas
                </span>{' '}
                direto no seu e-mail.
              </p>

              <form onSubmit={handleSubmit} className="flex bg-white text-sm p-1.5 rounded-full w-full max-w-md mt-8 border-2 border-slate-200 focus-within:border-cyan-300 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  required
                  className="flex-1 pl-5 outline-none bg-transparent min-w-0"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 bg-slate-800 text-white text-sm font-bold py-3.5 px-6 sm:px-8
                              rounded-full hover:bg-gradient-to-r hover:text-slate-900
                              hover:to-violet-400 hover:via-orange-400 hover:via-cyan-500
                              hover:from-red-400 hover:scale-[1.02]
                              active:scale-95 transition-all"
                >
                  {loading ? 'Enviando...' : 'Assinar'}
                </button>
              </form>

              {status.message && (
                <div
                  className={`max-w-md mt-4 p-4 rounded-xl flex items-center gap-3 text-sm ${
                    status.type === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {status.type === 'success' ? <CheckCircle size={18} className="shrink-0" /> : <AlertCircle size={18} className="shrink-0" />}
                  <span>{status.message}</span>
                </div>
              )}

              <p className="mt-4 text-xs text-slate-400">
                Sem spam. Cancele quando quiser.
              </p>
            </div>

            {/* Pilha de cupons — visual temático, ligado ao que a loja vende */}
            <div className="hidden md:flex flex-col gap-5 items-center">
              {CATEGORY_EXAMPLES.map((cat) => (
                <div
                  key={cat.label}
                  className={`relative w-full max-w-xs bg-white border-2 border-dashed border-slate-300 rounded-2xl px-6 py-5 shadow-sm ${cat.rotate} hover:rotate-0 transition-transform duration-300`}
                >
                  {/* Notches do cupom */}
                  <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-50 border-2 border-dashed border-slate-300" />
                  <span className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-50 border-2 border-dashed border-slate-300" />

                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{cat.label}</p>
                  <p className="text-2xl font-black text-orange-500 mt-1">{cat.discount}</p>
                </div>
              ))}
              <p className="text-xs text-slate-400 text-center max-w-xs">
                É mais ou menos assim que chega no seu e-mail.
              </p>
            </div>
          </div>
        </section>

        {/* PERKS — cupons horizontais no lugar da lista genérica de bullets */}
        <section className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERKS.map((perk) => (
              <div
                key={perk}
                className="border-2 border-dashed border-slate-200 rounded-2xl px-5 py-6 text-center text-sm font-medium text-slate-600"
              >
                {perk}
              </div>
            ))}
          </div>
        </section>

        {/* Bloco final — reforço da identidade, sem repetir o formulário */}
        <section className="border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-14 text-center">
            <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
              A{' '}
              <span className="font-black bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">
                .PrismaOfertas
              </span>{' '}
              existe pra você não precisar caçar desconto em dez lugares diferentes. A gente
              filtra, você economiza.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Newsletter;