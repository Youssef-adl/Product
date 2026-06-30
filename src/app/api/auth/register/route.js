import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, phone, company } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password, 12),
        role: "client",
        phone: phone || null,
        company: company || null,
      },
    });

    return NextResponse.json({
      message: "User registered successfully",
      user: { id: user.id.toString(), email: user.email },
    }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
