import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

const LARAVEL_API = process.env.LARAVEL_API_URL || "http://localhost:8000/api";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = params;

  try {
    const body = await req.json();
    const res = await fetch(`${LARAVEL_API}/return-requests/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${session.user.access_token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data?.message || "Failed to update return request" }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Update return request error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
