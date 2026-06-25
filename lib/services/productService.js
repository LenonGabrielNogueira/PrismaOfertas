import prisma from "@/lib/prisma";

export async function getPaginatedProducts({
  categorySlug = "",
  search = "",
  isFeatured = false,
  discount = false,
  page = 1,
  limit = 12,
}) {
  const skip = (page - 1) * limit;

  const where = {
    isActive: true,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
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
        images: true,
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
        createdAt: "desc",
      },
      take: limit,
      skip,
    }),
    prisma.product.count({ where }),
    categorySlug
      ? prisma.category.findUnique({ where: { slug: categorySlug } })
      : null,
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    products,
    total,
    category: categoryData,
    totalPages,
  };
}
