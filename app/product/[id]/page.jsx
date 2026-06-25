import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"
import ProductGallery from "@/components/ProductGallery"
import ProductInfo from "@/components/ProductInfo"
import ProductGrid from "@/components/ProductGrid"

export const revalidate = 3600

export async function generateMetadata({ params }) {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: { id },
    select: { name: true, description: true }
  })

  if (!product) return { title: "Produto não encontrado | PrismaOfertas" }

  return {
    title: `${product.name} | PrismaOfertas`,
    description: product.description?.slice(0, 160) || product.name,
  }
}

const ProductPage = async ({ params }) => {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: { id, isActive: true },
    include: { category: true },
  })

  if (!product) notFound()

  // Registrar PageView (Prisma direto, sem fetch HTTP)
  await prisma.pageView.create({
    data: { page: `/product/${id}` },
  }).catch(err => console.error("[PAGEVIEW_ERROR]", err))

  // Produtos relacionados — mesma categoria, exclui o atual
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      isActive: true,
      id: { not: product.id },
    },
    take: 8,
    orderBy: { createdAt: "desc" },
  })

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">

        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: product.category.name, href: `/category/${product.category.slug}` },
            { label: product.name, href: "#" },
          ]}
        />

        {/* Grid principal: Galeria + Informações */}
        <div className="px-6 max-w-7xl mx-auto my-10
                        grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>

        {/* Produtos relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="px-6 max-w-7xl mx-auto">
              <h2 className="text-2xl font-black text-slate-800 mb-2">
                Produtos Relacionados
              </h2>
              <p className="text-slate-700 text-sm mb-10">
                Mais opções em {product.category.name}
              </p>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        )}

      </main>

      <Footer />
    </>
  )
}

export default ProductPage