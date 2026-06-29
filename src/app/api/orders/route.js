import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const LARAVEL_API = process.env.LARAVEL_API_URL || "http://localhost:8000/api";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const res = await fetch(`${LARAVEL_API}/orders`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.user.access_token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data?.message || "Failed to fetch orders" }, { status: res.status });
    }

    return NextResponse.json(data);
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

    const res = await fetch(`${LARAVEL_API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${session.user.access_token}`,
      },
      body: JSON.stringify({
        user_id: parseInt(session.user.id),
        total_amount,
        shipping_address,
        phone,
        items: items.map((item) => ({
          product_id: item.product_id || item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ 
        error: data?.message || "Failed to create order",
        errors: data?.errors || null,
        success: false
      }, { status: res.status });
    }

    return NextResponse.json({
      success: true,
      ...data
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
