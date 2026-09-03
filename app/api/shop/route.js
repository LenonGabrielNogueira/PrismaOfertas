import prisma from '@/lib/prisma'

const PRODUCTS_PER_CATEGORY = 12

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            where: { isActive: true },
            select: { id: true, name: true, slug: true },
            orderBy: { name: 'asc' },
        })

        const categoriesWithProducts = await Promise.all(
            categories.map(async (category) => {
                const [products, totalCount] = await Promise.all([
                    prisma.product.findMany({
                        where: { isActive: true, category: { id: category.id } },
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            originalPrice: true,
                            price: true,
                            discount: true,
                            images: true,
                            platform: true,
                            affiliateUrl: true,
                            isFeatured: true,
                        },
                        orderBy: { createdAt: 'desc' },
                        take: PRODUCTS_PER_CATEGORY,
                    }),
                    prisma.product.count({
                        where: { isActive: true, category: { id: category.id } },
                    }),
                ])

                return { ...category, totalCount, products }
            })
        )

        const nonEmptyCategories = categoriesWithProducts.filter(
            (category) => category.products.length > 0
        )

        return Response.json(
            { categories: nonEmptyCategories },
            { status: 200, headers: { 'Cache-Control': 'public, max-age=300' } }
        )
    } catch (error) {
        console.error('Erro ao buscar produtos por categoria:', error)
        return Response.json({ error: 'Erro ao buscar produtos por categoria' }, { status: 500 })
    }
}