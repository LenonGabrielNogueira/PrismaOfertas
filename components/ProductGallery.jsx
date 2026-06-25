'use client'
import { useState } from 'react'
import Image from 'next/image'

const ProductGallery = ({ images = [], name }) => {

  const validImages = images && images.length > 0
    ? images.filter(img => img && img !== "")
    : []

  const [selected, setSelected] = useState(0)

  if (validImages.length === 0) {
    return (
      <div className='w-full aspect-square bg-slate-100 rounded-[2rem]
                      flex items-center justify-center'>
        <span className='text-slate-300 text-sm'>Sem imagem</span>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      {/* Imagem principal */}
      <div className='relative w-[450px] aspect-square bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 mx-auto'>
        <Image
          src={validImages[selected]}
          alt={name || "Produto"}
          fill
          className='object-contain p-8'
          priority
        />
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className='flex gap-3 overflow-x-auto pb-1'>
          {validImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={`relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden
                         border-2 transition-all bg-slate-50
                         ${selected === index
                           ? 'border-green-500 shadow-md'
                           : 'border-slate-100 opacity-70 hover:opacity-100'}`}
            >
              <Image
                src={img}
                alt={`${name} - imagem ${index + 1}`}
                fill
                className='object-contain p-1.5'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductGallery