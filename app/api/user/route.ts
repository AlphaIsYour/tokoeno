import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

// GET /api/user - Get user profile by email
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    // Check for proper authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure the user is requesting their own data
    if (session.user?.email !== email) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter required" },
        { status: 400 }
      );
    }

    // Get user data
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        location: true,
        join_date: true,
        image: true,
        cover_pic: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get additional stats
    const orderCount = await prisma.order.count({
      where: { userId: user.id },
    });

    const reviewCount = await prisma.review.count({
      where: { userId: user.id },
    });

    // Get social links if available
    const socialLinks = await prisma.userSocialLinks.findFirst({
      where: { user_id: user.id },
    });

    // Get pinned items if available
    const pinnedItems = await prisma.pinnedItems.findMany({
      where: { user_id: user.id },
      include: {
        // Changed from select to include
        product: {
          select: {
            id: true,
            name: true,
            images: true,
          },
        },
      },
    });

    // Format pinned items with null check
    const formattedPinnedItems = pinnedItems.map((item) => {
      // Add null check
      if (!item.product) {
        return {
          id: item.id,
          name: "Unknown Product",
          image: "/img/placeholder.jpg",
        };
      }

      return {
        id: item.id,
        name: item.product.name,
        image: item.product.images?.[0]?.url || "/img/placeholder.jpg",
      };
    });

    // Adjust for the structure of socialLinks
    let socialData = {};

    if (socialLinks) {
      // Assuming socialLinks uses platform and url fields instead of specific platform names
      const platforms = ["twitter", "instagram", "github", "linkedin"];
      platforms.forEach((platform) => {
        // If you have a structure with platform and url fields
        const platformLink = socialLinks[platform as keyof typeof socialLinks];
        if (platformLink) {
          socialData = {
            ...socialData,
            [platform]: platformLink,
          };
        }
      });
    }

    // Format user data with additional info
    const userData = {
      ...user,
      orders: orderCount,
      reviews: reviewCount,
      social: socialData,
      pinnedItems: formattedPinnedItems,
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
