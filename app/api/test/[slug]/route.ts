import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  return NextResponse.json({
    message: `Slug: ${params.slug}`,
  });
}
