"use client";
import ProductCard from "./ProductCard";
import { PackageSearchIcon } from "lucide-react";

const ProductGrid = ({ products = [] }) => {
  // Problema 3: Removido o filtro que escondia produtos. 
  // Agora exibimos todos e o ProductCard lida com placeholders.
  if (products.length === 0) {
    return (
      <div className="px-6 max-w-7xl mx-auto">
        <div
          className="flex flex-col items-center justify-center py-24
                        bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200"
        >
          <div className="bg-white p-6 rounded-full shadow-sm mb-4">
            <PackageSearchIcon size={40} className="text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium text-lg text-center">
            Nenhum produto encontrado nesta categoria
          </p>
          <p className="text-slate-400 text-sm mt-1 text-center px-6">
            Em breve novos produtos serão adicionados aqui.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 max-w-7xl mx-auto">
      {/* GRID — Seguindo rigorosamente as classes de BestSelling.jsx */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                      gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-16"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;