// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password, provider, providerId } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email diperlukan" }, { status: 400 });
    }

    const columns = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = 'User'
    `;

    const columnNames = Array.isArray(columns)
      ? columns.map((col: { column_name: string }) =>
          col.column_name.toLowerCase()
        )
      : [];

    const hasPasswordColumn = columnNames.includes("password");
    const hasProviderColumn = columnNames.includes("provider");
    const hasProviderIdColumn = columnNames.includes("providerid");

    const baseSelect = {
      id: true,
      name: true,
      email: true,
      role: true,
    };

    const selectOptions = {
      ...baseSelect,
      ...(columnNames.includes("image") ? { image: true } : {}),
      ...(hasPasswordColumn ? { password: true } : {}),
      ...(hasProviderColumn ? { provider: true } : {}),
      ...(hasProviderIdColumn ? { providerId: true } : {}),
    };

    const user = await prisma.user.findUnique({
      where: { email },
      select: selectOptions,
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email tidak ditemukan" },
        { status: 401 }
      );
    }

    if (provider && providerId && hasProviderColumn && hasProviderIdColumn) {
      if (user.provider === provider && user.providerId === providerId) {
        return NextResponse.json({
          message: "Login berhasil dengan OAuth",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            ...(user.image ? { image: user.image } : {}),
            role: user.role,
          },
        });
      } else {
        return NextResponse.json(
          { error: "Kredensial OAuth tidak valid" },
          { status: 401 }
        );
      }
    }
    // Cek login dengan password
    else if (password && hasPasswordColumn) {
      // Jika user tidak memiliki password (hanya OAuth), tolak login dengan password
      if (!user.password) {
        return NextResponse.json(
          { error: "Akun ini hanya dapat login dengan OAuth" },
          { status: 401 }
        );
      }

      // Verifikasi password
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return NextResponse.json(
          { error: "Email atau password salah" },
          { status: 401 }
        );
      }

      return NextResponse.json({
        message: "Login berhasil dengan password",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          ...(user.image ? { image: user.image } : {}),
          role: user.role,
        },
      });
    } else {
      return NextResponse.json(
        { error: "Metode autentikasi tidak valid" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("[ERROR_LOGIN]", error);

    // Handle errors
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (
      errorMessage.includes("User.password") ||
      errorMessage.includes("provider") ||
      errorMessage.includes("providerId")
    ) {
      return NextResponse.json(
        { error: "Silakan login dengan OAuth (Google)" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
