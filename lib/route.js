import prisma from '@/lib/prisma';
import authAdmin from '@/middlewares/authAdmin';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    try {
        const { userId } = getAuth(request);
        if (!await authAdmin(userId)) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

        const { id } = await params;
        const body = await request.json();

        const updated = await prisma.category.update({
            where: { id },
            data: body
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar categoria' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { userId } = getAuth(request);
        if (!await authAdmin(userId)) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

        const { id } = await params;
        await prisma.category.delete({ where: { id } });

        return NextResponse.json({ success: true, message: "Categoria removida" });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao remover categoria' }, { status: 500 });
    }
}