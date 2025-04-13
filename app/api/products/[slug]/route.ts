// app/api/products/[slug]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> } // Eksplisit pake Promise
) {
  try {
    // Ambil params dengan await
    const params = await context.params;
    const slug = params.slug;

    // Validasi slug
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Slug invalid" }, { status: 400 });
    }

    // Ambil data dari DB
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { images: true },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("[ERROR_API_GET_PRODUCT]", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
