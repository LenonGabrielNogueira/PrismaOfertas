import prisma from "@/lib/prisma";
import { startOfDay, startOfWeek, startOfMonth, subDays, format } from "date-fns";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const now = new Date();
        const today = startOfDay(now);
        const week = startOfWeek(now);
        const month = startOfMonth(now);

        const [
            visitorsToday,
            visitorsWeek,
            visitorsMonth,
            topClicks,
            topSearches,
            productsNoClicks,
            recentViews
        ] = await Promise.all([
            prisma.pageView.count({ where: { viewedAt: { gte: today } } }),
            prisma.pageView.count({ where: { viewedAt: { gte: week } } }),
            prisma.pageView.count({ where: { viewedAt: { gte: month } } }),
            prisma.productClick.groupBy({
                by: ['productId'],
                _count: { productId: true },
                orderBy: { _count: { productId: 'desc' } },
                take: 10
            }),
            prisma.searchLog.groupBy({
                by: ['query'],
                _count: { query: true },
                orderBy: { _count: { query: 'desc' } },
                take: 10
            }),
            prisma.product.findMany({
                where: { clicks: { none: {} } },
                select: { id: true, name: true, platform: true },
                take: 10
            }),
            prisma.pageView.findMany({
                where: { viewedAt: { gte: subDays(today, 7) } },
                select: { viewedAt: true }
            })
        ]);

        const chartData = Array.from({ length: 7 }).map((_, i) => {
            const d = subDays(today, i);
            const dateStr = format(d, 'yyyy-MM-dd');
            return {
                date: format(d, 'dd/MM'),
                visitantes: recentViews.filter(v => format(new Date(v.viewedAt), 'yyyy-MM-dd') === dateStr).length
            };
        }).reverse();

        return NextResponse.json({
            stats: {
                visitorsToday,
                visitorsWeek,
                visitorsMonth,
                totalProducts: await prisma.product.count({ where: { isActive: true } })
            },
            topClicks,
            topSearches,
            criticalProducts: productsNoClicks,
            chartData
        });

    } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}