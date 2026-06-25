import { notFound, redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryHeader from "@/components/CategoryHeader";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import { getPaginatedProducts } from "@/lib/services/productService";
import prisma from "@/lib/prisma";

const PRODUCTS_PER_PAGE = 12;

// Fase 4: ISR - Revalida a página a cada 1 hora
export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  const category = await prisma.category.findUnique({
    where: { slug },
    select: { name: true, description: true }
  });

  if (!category) return { title: "Categoria não encontrada | .PrismaOfertas" };

  return {
    title: `${category.name} | .PrismaOfertas`,
    description: category.description || `Confira as melhores ofertas de ${category.name}`,
  };
}

const CategoryPage = async ({ params, searchParams }) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { slug } = resolvedParams;
  
  // Ajuste de segurança: Validar página negativa ou inválida
  const sParams = await searchParams;
  const page = Math.max(1, Number(sParams?.page) || 1);

  // Fase 4: Uso da camada de serviço
  const { products, total, category, totalPages } = await getPaginatedProducts({
    categorySlug: slug,
    page,
    limit: PRODUCTS_PER_PAGE
  });

  // Fase 4: Ordem correta de validação
  if (!category) {
    notFound();
  }

  if (total > 0 && page > totalPages) {
    redirect(`/category/${slug}?page=${totalPages}`);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <CategoryHeader
          name={category.name}
          description={category.description || ""}
          totalProducts={total}
          currentPage={page}
          totalPages={totalPages}
        />
        <ProductGrid products={products} />
        <Pagination currentPage={page} totalPages={totalPages} slug={slug} />
      </main>
      <Footer />
    </>
  );
};

export default CategoryPage;