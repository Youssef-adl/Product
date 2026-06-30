import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const returns = await prisma.returnRequest.findMany({
      include: { order: { include: { items: { include: { product: true } } } }, user: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, returns });
  } catch (error) {
    console.error("Fetch return requests error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { order_id, reason } = body;

    if (!order_id || !reason) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: { id: parseInt(order_id), userId: parseInt(session.user.id) },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const existing = await prisma.returnRequest.findUnique({ where: { orderId: parseInt(order_id) } });
    if (existing) {
      return NextResponse.json({ error: "Return request already exists for this order" }, { status: 409 });
    }

    const returnRequest = await prisma.returnRequest.create({
      data: {
        orderId: parseInt(order_id),
        userId: parseInt(session.user.id),
        reason,
        status: "pending",
      },
      include: { order: true },
    });

    return NextResponse.json({ success: true, message: "Return request submitted", return_request: returnRequest }, { status: 201 });
  } catch (error) {
    console.error("Create return request error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
