"use client";
import Link from 'next/link'
import ProductCard from './ProductCard'
import { PackageIcon, ArrowRightIcon } from 'lucide-react'

const CategorySection = ({ categoryName, categorySlug, products, totalCount, reversed }) => {
    if (!products || products.length === 0) return null

    return (
        <section className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-10 items-start`}>
            <div className="md:w-1/4 w-full md:sticky md:top-24 bg-gradient-to-r from-green-50 to-slate-50 border border-slate-100 rounded-[2rem] p-6 sm:p-8">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Categoria</p>
                <h2 className="text-2xl font-black text-slate-800 leading-tight mb-4">{categoryName}</h2>

                <div className="inline-flex items-center gap-2 bg-white border border-slate-100 shadow-sm rounded-full px-4 py-2 mb-5">
                    <PackageIcon size={14} className="text-green-600" />
                    <span className="text-xs font-bold text-slate-700">
                        {totalCount} {totalCount === 1 ? 'produto' : 'produtos'}
                    </span>
                </div>

                <Link
                    href={`/category/${categorySlug}`}
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700
                               transition-colors text-white text-sm font-semibold
                               rounded-full px-5 py-2.5 shadow-sm w-fit"
                >
                    Ver produtos
                    <ArrowRightIcon size={16} />
                </Link>
            </div>

            <div className="md:w-3/4 w-full grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-16">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}

export default CategorySection