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
      where: { slug: params.slug }, // <-- params.slug sudah aman
      include: { images: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
