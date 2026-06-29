import { NextResponse } from "next/server";

const LARAVEL_API = process.env.LARAVEL_API_URL || "http://localhost:8000/api";

export async function GET(req, { params }) {
  try {
    // In Next.js 15+, params is a Promise
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    console.log(`Proxying request for product ID: ${id} to ${LARAVEL_API}/products/${id}`);
    
    const res = await fetch(`${LARAVEL_API}/products/${id}`, {
      headers: { 
        Accept: "application/json",
        "Cache-Control": "no-cache"
      },
      cache: "no-store",
    });

    const data = await res.json();
    console.log(`Laravel response status: ${res.status}`, data);

    if (!res.ok) {
      return NextResponse.json({ 
        error: "Product not found", 
        details: data.message || "Unknown error",
        status: res.status 
      }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch product detail error:", error);
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
  }
}
