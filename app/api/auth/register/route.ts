// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, role } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email diperlukan" }, { status: 400 });
    }

    // Cek apakah email sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // Simpan user
    const user = await prisma.user.create({
      data: {
        email,
        name: email.split("@")[0], // Nama sementara
        role: role || "USER",
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("[ERROR_REGISTER]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
