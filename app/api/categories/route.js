import prisma from '@/lib/prisma';
import authAdmin from '@/middlewares/authAdmin';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// GET: Listar todas as categorias (Público)
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' }
        });
        return NextResponse.json({ success: true, data: categories });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar categorias" }, { status: 500 });
    }
}

// POST: Criar nova categoria (Admin)
export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        if (!await authAdmin(userId)) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

        const body = await request.json();
        const category = await prisma.category.create({ data: body });
        return NextResponse.json({ success: true, data: category });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao criar categoria" }, { status: 500 });
    }
}