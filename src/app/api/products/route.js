import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("Fetch products error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, price, category, sku, description, stock, spec, imageUrl } = body;

    if (!name || !price || !category || !sku) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.product.findUnique({ where: { sku } });
    if (existing) {
      return NextResponse.json({ error: "SKU already exists" }, { status: 409 });
    }

    const product = await prisma.product.create({
      data: { name, price: parseFloat(price), category, sku, description, stock: parseInt(stock) || 0, spec, imageUrl },
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
