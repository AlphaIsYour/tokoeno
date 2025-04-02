import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Validasi slug
    if (!params?.slug || typeof params.slug !== "string") {
      return NextResponse.json({ error: "Slug invalid" }, { status: 400 });
    }

    // Ambil data dari DB
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
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
