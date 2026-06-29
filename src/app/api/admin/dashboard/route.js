import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

const LARAVEL_API = process.env.LARAVEL_API_URL || "http://localhost:8000/api";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const res = await fetch(`${LARAVEL_API}/dashboard-stats`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.user.access_token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data?.message || "Failed to fetch dashboard stats" }, { status: res.status });
    }

    // Laravel returns { success: true, stats: { ... } }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch dashboard stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
