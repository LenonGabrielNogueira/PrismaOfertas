import prisma from "@/lib/prisma";
import authAdmin from "@/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// POST: Cadastro público (Newsletter do Footer)
export async function POST(request) {
    try {
        const { email } = await request.json();
        if (!email) return NextResponse.json({ error: "E-mail obrigatório" }, { status: 400 });

        const subscriber = await prisma.newsletter.upsert({
            where: { email },
            update: { isActive: true },
            create: { email }
        });

        return NextResponse.json({ success: true, data: subscriber }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao cadastrar" }, { status: 500 });
    }
}

// GET: Listagem para o Admin
export async function GET(request) {
    try {
        const { userId } = getAuth(request);
        if (!await authAdmin(userId)) {
            return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
        }

        const emails = await prisma.newsletter.findMany({
            orderBy: { subscribedAt: 'desc' }
        });

        return NextResponse.json({ data: emails }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}