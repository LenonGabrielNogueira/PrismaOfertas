import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryHeader from "@/components/CategoryHeader";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";

const PRODUCTS_PER_PAGE = 12;

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
    select: { name: true }
  });
  if (!category) return { title: "Categoria não encontrada | PrismaOfertas" };
  return {
    title: `${category.name} | PrismaOfertas`,
  };
}

const CategoryPage = async ({ params, searchParams }) => {
  const { slug }  = await params;
  const sParams   = await searchParams;
  const page      = Math.max(1, Number(sParams?.page) || 1);
  const limit     = PRODUCTS_PER_PAGE;
  const skip      = (page - 1) * limit;

  const [products, total, category] = await Promise.all([
    prisma.product.findMany({
      where:   { isActive: true, category: { slug } },
      take:    limit,
      skip:    skip,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({
      where: { isActive: true, category: { slug } },
    }),
    prisma.category.findUnique({ where: { slug } }),
  ]);

  if (!category) notFound();

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (total > 0 && page > totalPages) {
    redirect(`/category/${slug}?page=${totalPages}`);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <CategoryHeader
          name={category.name}
          description={""}
          totalProducts={total}
          currentPage={page}
          totalPages={totalPages}
        />
        <ProductGrid products={products} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          slug={slug}
        />
      </main>
      <Footer />
    </>
  );
};

export default CategoryPage;