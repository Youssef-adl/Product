import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { status, admin_note } = body;

    if (!status || !["approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const returnRequest = await prisma.returnRequest.update({
      where: { id: parseInt(id) },
      data: { status, adminNote: admin_note || null },
      include: { order: true, user: true },
    });

    return NextResponse.json({ success: true, message: "Return request updated", return_request: returnRequest });
  } catch (error) {
    console.error("Update return request error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
