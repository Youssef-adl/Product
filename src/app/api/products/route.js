import { NextResponse } from "next/server";

const LARAVEL_API = process.env.LARAVEL_API_URL || "http://localhost:8000/api";

export async function GET(req) {
  try {
    const res = await fetch(`${LARAVEL_API}/products`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch products" }, { status: res.status });
    }

    // Laravel returns { success: true, data: [...] }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch products error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    // Pass through any auth token that upstream components may include
    const authHeader = req.headers.get("Authorization");

    const res = await fetch(`${LARAVEL_API}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data?.message || "Failed to create product" }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
