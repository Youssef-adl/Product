import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

const LARAVEL_API = process.env.LARAVEL_API_URL || "http://localhost:8000/api";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const res = await fetch(`${LARAVEL_API}/orders/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.user.access_token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data?.message || "Failed to fetch order" }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
