import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Definisikan fungsi GET sebagai Route Handler
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  // Extract slug from params secara langsung
  const { slug } = params;

  try {
    // Gunakan slug dalam query
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
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Gagal mengambil produk" },
      { status: 500 }
    );
  }
}
