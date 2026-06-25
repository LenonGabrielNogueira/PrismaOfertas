import prisma from '@/lib/prisma';
import { createHash } from 'crypto';

export async function POST(request) {
    try {
        const { page, sessionId } = await request.json();

        const userAgent = request.headers.get('user-agent') || '';
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
        const ipHash = createHash('sha256').update(ip).digest('hex');

        await prisma.pageView.create({
            data: {
                page: page || '/',
                userAgent,
                ipHash,
                sessionId: sessionId || null,
            },
        });

        return Response.json(
            { message: 'Visita registrada' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Erro ao registrar visita:', error);
        return Response.json(
            { error: 'Erro ao registrar visita' },
            { status: 500 }
        );
    }
}