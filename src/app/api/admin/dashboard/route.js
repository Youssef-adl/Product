import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const totalProducts = await prisma.product.count();
    const totalSales = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: { notIn: ["cancelled", "refunded"] } },
    });
    const activeUsers = await prisma.user.count({
      where: { role: { not: "admin" } },
    });
    const recentOrders = await prisma.order.findMany({
      take: 5,
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        totalSales: totalSales._sum.totalAmount || 0,
        activeUsers,
        recentOrders: recentOrders.map((o) => ({
          id: o.orderNumber,
          client: o.user?.name || "Anonymous",
          total: o.totalAmount,
          status: o.status.toLowerCase(),
        })),
        conversionRate: "3.2%",
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
