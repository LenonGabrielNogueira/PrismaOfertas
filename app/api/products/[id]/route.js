import { NextResponse } from "next/server";
import { auth }         from "@clerk/nextjs/server";
import prisma           from "@/lib/prisma";

// ── Helper: verificar se é admin ──────────────────────────
const isAdmin = (email) => {
    return email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
};

// ── PATCH /api/products/[id] ──────────────────────────────
// Atualiza campos do produto (ex: toggle isActive)
export async function PATCH(request, { params }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            );
        }

        const { id } = await params;
        const body   = await request.json();

        // Campos permitidos para atualização via admin
        const allowedFields = [
            "isActive",
            "isFeatured",
            "price",
            "discount",
            "name",
            "description",
            "images",
        ];

        const dataToUpdate = Object.fromEntries(
            Object.entries(body).filter(([key]) =>
                allowedFields.includes(key)
            )
        );

        if (Object.keys(dataToUpdate).length === 0) {
            return NextResponse.json(
                { error: "Nenhum campo válido para atualizar" },
                { status: 400 }
            );
        }

        const product = await prisma.product.update({
            where: { id },
            data:  dataToUpdate,
        });

        return NextResponse.json(product);

    } catch (error) {
        console.error("[PRODUCT_PATCH_ERROR]", error);

        // Produto não encontrado
        if (error.code === "P2025") {
            return NextResponse.json(
                { error: "Produto não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: "Erro interno" },
            { status: 500 }
        );
    }
}

// ── DELETE /api/products/[id] ─────────────────────────────
// Deleta o produto e seus cliques relacionados
export async function DELETE(request, { params }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            );
        }

        const { id } = await params;

        // Deletar cliques relacionados primeiro
        // (caso não tenha onDelete: Cascade no schema)
        await prisma.productClick.deleteMany({
            where: { productId: id },
        });

        // Deletar o produto
        await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: "Produto deletado com sucesso" },
            { status: 200 }
        );

    } catch (error) {
        console.error("[PRODUCT_DELETE_ERROR]", error);

        if (error.code === "P2025") {
            return NextResponse.json(
                { error: "Produto não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: "Erro interno" },
            { status: 500 }
        );
    }
}

// ── GET /api/products/[id] ────────────────────────────────
// Busca um produto específico pelo id
export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const product = await prisma.product.findUnique({
            where:   { id },
            include: { category: true },
        });

        if (!product) {
            return NextResponse.json(
                { error: "Produto não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(product);

    } catch (error) {
        console.error("[PRODUCT_GET_ERROR]", error);
        return NextResponse.json(
            { error: "Erro interno" },
            { status: 500 }
        );
    }
}