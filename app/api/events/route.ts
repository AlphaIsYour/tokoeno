// app/api/events/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      // Hapus filter endDate buat tes
      orderBy: { createdAt: "desc" }, // Urut dari terbaru
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
      },
    });
    console.log("[API_EVENTS]", events); // Debug
    return NextResponse.json(events);
  } catch (error) {
    console.error("[ERROR_GET_EVENTS]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
