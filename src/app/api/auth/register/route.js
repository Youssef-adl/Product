import { NextResponse } from "next/server";

const LARAVEL_API = process.env.LARAVEL_API_URL || "http://localhost:8000/api";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, password_confirmation, phone, company } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const res = await fetch(`${LARAVEL_API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: password_confirmation || password,
        phone: phone || null,
        company: company || null,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.message || "Registration failed" },
        { status: res.status }
      );
    }

    return NextResponse.json({
      message: "User registered successfully",
      user: { id: data.user.id.toString(), email: data.user.email },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
