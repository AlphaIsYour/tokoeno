import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"; // <-- Default import

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Validasi input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    // Cek email unik
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const user = await prisma.user.create({
      data: {
        name, // Gunakan nilai dari request
        email, // Bukan nilai hardcode
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Registrasi berhasil",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Registration error:", errorMessage);
    // <-- Type annotation
    console.error("Registration error:", error); // <-- Error digunakan di sini
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
