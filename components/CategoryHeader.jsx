"use client";
import { PackageIcon } from "lucide-react";

const CategoryHeader = ({
  name,
  description,
  totalProducts,
  currentPage,
  totalPages,
}) => {
  return (
    <div className="px-6 max-w-7xl mx-auto mt-10 mb-8">
      <div
        className="bg-gradient-to-r from-green-50 to-slate-50 border border-slate-100
                      rounded-[2rem] p-8 sm:p-10"
      >
        {/* Breadcrumb Visual */}
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Categoria
        </p>

        {/* Nome da categoria */}
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight mb-2">
          {name}
        </h1>

        {/* Descrição */}
        {description && (
          <p className="text-slate-500 text-sm sm:text-base mb-6">
            {description}
          </p>
        )}

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4">
          <div
            className="flex items-center gap-2 bg-white border border-slate-100
                          shadow-sm rounded-full px-4 py-2"
          >
            <PackageIcon size={14} className="text-green-600" />
            <span className="text-xs font-bold text-slate-700">
              {totalProducts} {totalProducts === 1 ? "produto" : "produtos"}
            </span>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2 bg-white border border-slate-100 shadow-sm rounded-full px-4 py-2">
              <span className="text-xs font-bold text-slate-500">
                Página {currentPage} de {totalPages}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;