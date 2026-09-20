import prisma from '@/lib/prisma';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const search = searchParams.get('search') || '';
        const categorySlug = searchParams.get('category') || '';
        const isFeatured = searchParams.get('isFeatured') === 'true';
        const discount = searchParams.get('discount') === 'true';
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
        const limit = Math.min(50, parseInt(searchParams.get('limit') || '12'));
        const skip = (page - 1) * limit;

        const where = {
            isActive: true,
        };

        if (search) {
            // Divide a busca em palavras e exige que cada uma apareça
            // em algum lugar (nome, descrição ou categoria) — permite
            // ordem diferente e termos espalhados no texto.
            const words = search
                .trim()
                .split(/\s+/)
                .filter(Boolean);

            if (words.length > 0) {
                where.AND = words.map((word) => ({
                    OR: [
                        { name: { contains: word, mode: 'insensitive' } },
                        { description: { contains: word, mode: 'insensitive' } },
                        { category: { name: { contains: word, mode: 'insensitive' } } },
                    ],
                }));
            }
        }

        if (categorySlug) {
            where.category = { ...where.category, slug: categorySlug };
        }

        if (isFeatured) {
            where.isFeatured = true;
        }

        if (discount) {
            where.discount = { gt: 0 };
        }

        const [products, total, categoryData] = await Promise.all([
            prisma.product.findMany({
                where,
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
                    createdAt: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                take: limit,
                skip,
            }),
            prisma.product.count({ where }),
            categorySlug ? prisma.category.findUnique({ where: { slug: categorySlug } }) : null
        ]);

        const totalPages = Math.ceil(total / limit);

        return Response.json(
            {
                products,
                total,
                category: categoryData,
                page,
                totalPages,
            },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'public, max-age=300',
                },
            }
        );
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return Response.json(
            { error: 'Erro ao buscar produtos' },
            { status: 500 }
        );
    }
}