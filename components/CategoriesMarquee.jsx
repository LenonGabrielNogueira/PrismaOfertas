'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';

const CategoriesMarquee = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                if (!response.ok) throw new Error('Erro ao buscar categorias');
                const data = await response.json();
                
                // Ajuste preventivo: garante que categories receba um array
                // Se data.data existir (envelope da API), usamos ele. Caso contrário, tentamos o data.
                const categoriesArray = Array.isArray(data) ? data : (data.data || []);
                setCategories(categoriesArray);
            } catch (error) {
                console.error('Erro ao carregar categorias:', error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Garantia extra antes da renderização
    const safeCategories = Array.isArray(categories) ? categories : [];

    // PASSO 7: Skeleton loading para estado de carregamento ou banco vazio
    if (loading || safeCategories.length === 0) {
        return (
            <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none sm:my-20 px-6">
                <div className="flex gap-4 overflow-hidden">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="h-12 w-32 bg-slate-50 border border-slate-100 rounded-2xl animate-pulse shrink-0" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none group sm:my-10">
            <div className="absolute left-0 top-0 h-full w-8 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
            <div className="flex min-w-[200%] animate-[marqueeScroll_10s_linear_infinite] sm:animate-[marqueeScroll_40s_linear_infinite] group-hover:[animation-play-state:paused] gap-4" >
                {/* Usamos o safeCategories para evitar erro de iteração */}
                {[...safeCategories, ...safeCategories, ...safeCategories, ...safeCategories].map((category, index) => (
                    <Link 
                        key={index}
                        href={`/category/${category.slug}`}
                        className="px-9 py-5 bg-cyan-100 border border-cyan-100 shadow-sm rounded-3xl text-cyan-700 font-medium text-xs sm:text-sm whitespace-nowrap transition-all duration-300 active:scale-95 hover:bg-gradient-to-r hover:from-red-400 hover:via-orange-400 hover:via-cyan-500 hover:to-violet-400 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-violet-400/30"
                    >
                        {category.name}
                    </Link>
                ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-20 md:w-8 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
    );
};

export default CategoriesMarquee;