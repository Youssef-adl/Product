import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    let orders;
    if (session.user.role === "admin") {
      orders = await prisma.order.findMany({
        include: { user: true, items: { include: { product: true } } },
        orderBy: { createdAt: "desc" },
      });
    } else {
      orders = await prisma.order.findMany({
        where: { userId: parseInt(session.user.id) },
        include: { user: true, items: { include: { product: true } } },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { items, shipping_address, phone, total_amount } = body;

    if (!items || !items.length || !shipping_address || !total_amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderNumber = `SOL-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = await prisma.order.create({
      data: {
        userId: parseInt(session.user.id),
        orderNumber,
        totalAmount: parseFloat(total_amount),
        shippingAddress: shipping_address,
        phone: phone || null,
        status: "pending",
        items: {
          create: items.map((item) => ({
            productId: item.product_id || item.id,
            quantity: item.quantity,
            price: parseFloat(item.price),
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json({ success: true, message: "Order placed successfully", order }, { status: 201 });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
