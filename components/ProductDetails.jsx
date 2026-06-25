'use client'

import { EarthIcon, CreditCardIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const ProductDetails = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R$';
    const [mainImage, setMainImage] = useState(product.images[0]);

    const handleProductClick = async () => {
        try {
            await fetch('/api/analytics/click', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product.id }),
            })
        } catch (error) {
            console.error('Erro ao registrar clique:', error)
        }
        window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer')
    }

    const discountPercent = product.originalPrice 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : product.discount || 0
    
    return (
        <div className="flex max-lg:flex-col gap-12">
            <div className="flex max-sm:flex-col-reverse gap-3">
                <div className="flex sm:flex-col gap-3">
                    {product.images.map((image, index) => (
                        <div key={index} onClick={() => setMainImage(product.images[index])} className="bg-slate-100 flex items-center justify-center size-26 rounded-lg group cursor-pointer">
                            <Image src={image} className="group-hover:scale-103 group-active:scale-95 transition" alt="" width={45} height={45} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center h-100 sm:size-113 bg-slate-100 rounded-lg ">
                    <Image src={mainImage} alt="" width={250} height={250} />
                </div>
            </div>
            <div className="flex-1">
                <h1 className="text-3xl font-semibold text-slate-800">{product.name}</h1>
                <p className="text-sm text-slate-500 mt-2">Plataforma: <span className="font-semibold">{product.platform}</span></p>
                
                <div className="flex items-start my-6 gap-3 text-2xl font-semibold text-slate-800">
                    <p>{currency}{product.price.toFixed(2)}</p>
                    {product.originalPrice && (
                        <p className="text-xl text-slate-500 line-through">{currency}{product.originalPrice.toFixed(2)}</p>
                    )}
                </div>
                {discountPercent > 0 && (
                    <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                        Economize {discountPercent}%
                    </div>
                )}
                
                <p className="text-slate-600 my-6">{product.description}</p>

                <button 
                    onClick={handleProductClick} 
                    className="bg-green-600 text-white px-10 py-3 text-lg font-semibold rounded-lg hover:bg-green-700 active:scale-95 transition mb-8"
                >
                    Ver na Loja ({product.platform})
                </button>

                <hr className="border-gray-300 my-5" />
                <div className="flex flex-col gap-4 text-slate-500">
                    <p className="flex gap-3"> <EarthIcon className="text-slate-400" /> Frete grátis para todo o mundo </p>
                    <p className="flex gap-3"> <CreditCardIcon className="text-slate-400" /> Pagamento 100% seguro </p>
                    <p className="flex gap-3"> <UserIcon className="text-slate-400" /> Confiável pelas principais marcas </p>
                </div>

            </div>
        </div>
    )
}

export default ProductDetails