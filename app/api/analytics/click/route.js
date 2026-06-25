import prisma from '@/lib/prisma';
import { createHash } from 'crypto';

export async function POST(request) {
    try {
        const { productId } = await request.json();

        if (!productId) {
            return Response.json(
                { error: 'productId é obrigatório' },
                { status: 400 }
            );
        }

        // Verificar se produto existe
        const product = await prisma.product.findUnique({
            where: { id: productId },
            select: { id: true },
        });

        if (!product) {
            return Response.json(
                { error: 'Produto não encontrado' },
                { status: 404 }
            );
        }

        // Pegar userAgent e IP do request
        const userAgent = request.headers.get('user-agent') || '';
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

        // Anonimizar IP com hash (LGPD)
        const ipHash = createHash('sha256').update(ip).digest('hex');

        // Registrar clique
        await prisma.productClick.create({
            data: {
                productId,
                userAgent,
                ipHash,
            },
        });

        return Response.json(
            { message: 'Clique registrado' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Erro ao registrar clique:', error);
        return Response.json(
            { error: 'Erro ao registrar clique' },
            { status: 500 }
        );
    }
}