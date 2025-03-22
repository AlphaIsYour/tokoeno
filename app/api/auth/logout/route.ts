import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Logout berhasil (dummy)" },
    { status: 200 }
  );
}
