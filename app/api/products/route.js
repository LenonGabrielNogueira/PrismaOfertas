import prisma from '@/lib/prisma';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        
        const search = searchParams.get('search') || '';
        const categorySlug = searchParams.get('category') || '';
        const isFeatured = searchParams.get('isFeatured') === 'true';
        const discount = searchParams.get('discount') === 'true';
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
        const limit = Math.min(50, parseInt(searchParams.get('limit') || '12')); // Padrão 12 conforme objetivo
        const skip = (page - 1) * limit;

        const where = {
            isActive: true,
        };

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (categorySlug) {
            where.category = { slug: categorySlug };
        }

        if (isFeatured) {
            where.isFeatured = true;
        }

        if (discount) {
            where.discount = { gt: 0 };
        }

        // Query ajustada para o novo contrato da Fase 3
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
                    images: true,        // ✅ corrigido de image para images
                    platform: true,
                    affiliateUrl: true,
                    isFeatured: true,
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
                products, // Contract ajustado para CategoryPage
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