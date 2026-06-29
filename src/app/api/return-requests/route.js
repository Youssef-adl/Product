import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const LARAVEL_API = process.env.LARAVEL_API_URL || "http://localhost:8000/api";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const res = await fetch(`${LARAVEL_API}/return-requests`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session.user.access_token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data?.message || "Failed to fetch return requests" }, { status: res.status });
    }

    return NextResponse.json(data);
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
    const res = await fetch(`${LARAVEL_API}/return-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${session.user.access_token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data?.message || "Failed to create return request" }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Create return request error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
