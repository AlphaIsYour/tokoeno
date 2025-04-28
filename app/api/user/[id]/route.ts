import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

// PUT /api/user/[id] - Update user profile
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const body = await request.json();

    // Check for proper authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user to verify ownership
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Ensure the user is updating their own profile
    if (session.user?.email !== currentUser.email) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Validate input
    const { name, bio, location } = body;

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || undefined,
        bio: bio || undefined,
        location: location || undefined,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        location: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
