import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    let productId;
    try {
        // No Next.js 15, params é uma Promise que deve ser aguardada
        const resolvedParams = await params;
        productId = resolvedParams.id;

        if (!productId) {
            return NextResponse.json(
                { success: false, error: 'ID do produto é obrigatório' },
                { status: 400 }
            );
        }

        const product = await prisma.product.findFirst({
            where: {
                id: productId,
                isActive: true,
            },
            include: {
                category: {
                    select: {
                        name: true,
                        slug: true,
                    },
                },
            },
        });

        if (!product) {
            return NextResponse.json(
                { success: false, error: 'Produto não encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: product },
            {
                status: 200,
                headers: {
                    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
                },
            }
        );
    } catch (error) {
        console.error(`Erro ao buscar produto ${productId || 'desconhecido'}:`, error);
        return NextResponse.json(
            { success: false, error: 'Erro interno ao processar requisição' },
            { status: 500 }
        );
    }
}