import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
 
const Pagination = ({ currentPage, totalPages, slug, basePath = '/category', extraParams = '' }) => {
 
  if (totalPages <= 1) return null
 
  // Se houver slug, assume rota de categoria. Se não, usa o basePath puro (ex: /shop)
  const baseUrl = slug ? `${basePath}/${slug}` : basePath;
  const queryPrefix = extraParams ? `${extraParams}&` : '';
 
  const getPageRange = () => {
    const delta = 2;
    const range = [];
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);
 
    for (let i = left; i <= right; i++) {
      range.push(i);
    }
    return range;
  };
 
  const pageRange = getPageRange();
 
  return (
    <div className="px-6 max-w-7xl mx-auto my-16">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {/* Anterior */}
        {currentPage > 1 ? (
          <Link
            href={`${baseUrl}?${queryPrefix}page=${currentPage - 1}`}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl
                       bg-white border border-slate-200 text-slate-600
                       text-xs font-bold hover:bg-slate-50 hover:border-slate-300
                       transition-all shadow-sm"
          >
            <ChevronLeftIcon size={14} />
            Anterior
          </Link>
        ) : (
          <span className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-300 text-xs font-bold cursor-not-allowed">
            <ChevronLeftIcon size={14} />
            Anterior
          </span>
        )}
 
        {/* Primeiro número e reticências */}
        {pageRange[0] > 1 && (
          <>
            <Link
              href={`${baseUrl}?${queryPrefix}page=1`}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-all shadow-sm"
            >
              1
            </Link>
            {pageRange[0] > 2 && <span className="w-10 h-10 flex items-center justify-center text-slate-400 text-sm">…</span>}
          </>
        )}
 
        {/* Números Centrais */}
        {pageRange.map((page) =>
          page === currentPage ? (
            <span
              key={page}
              className="w-10 h-10 flex items-center justify-center rounded-xl
                         bg-slate-800 text-white text-xs font-black shadow-md"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={`${baseUrl}?${queryPrefix}page=${page}`}
              className="w-10 h-10 flex items-center justify-center rounded-xl
                         bg-white border border-slate-200 text-slate-600
                         text-xs font-bold hover:bg-slate-50 hover:border-slate-300
                         transition-all shadow-sm"
            >
              {page}
            </Link>
          ),
        )}
 
        {/* Último número e reticências */}
        {pageRange[pageRange.length - 1] < totalPages && (
          <>
            {pageRange[pageRange.length - 1] < totalPages - 1 && <span className="w-10 h-10 flex items-center justify-center text-slate-400 text-sm">…</span>}
            <Link
              href={`${baseUrl}?${queryPrefix}page=${totalPages}`}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-all shadow-sm"
            >
              {totalPages}
            </Link>
          </>
        )}
 
        {/* Próximo */}
        {currentPage < totalPages ? (
          <Link href={`${baseUrl}?${queryPrefix}page=${currentPage + 1}`} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            Próximo <ChevronRightIcon size={14} />
          </Link>
        ) : (
          <span className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-300 text-xs font-bold cursor-not-allowed">
            Próximo <ChevronRightIcon size={14} />
          </span>
        )}
      </div>
    </div>
  );
};
 
export default Pagination;