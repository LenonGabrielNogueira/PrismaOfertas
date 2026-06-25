import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const { query, resultsCount } = await request.json();

        if (!query || query.trim().length === 0) {
            return Response.json(
                { error: 'Query é obrigatória' },
                { status: 400 }
            );
        }

        // Registrar busca
        await prisma.searchLog.create({
            data: {
                query: query.trim().toLowerCase(),
                resultsCount: resultsCount || 0,
            },
        });

        return Response.json(
            { message: 'Busca registrada' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Erro ao registrar busca:', error);
        return Response.json(
            { error: 'Erro ao registrar busca' },
            { status: 500 }
        );
    }
}