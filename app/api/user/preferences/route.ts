import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

// GET /api/user/preferences - Get user preferences
export async function GET() {
  try {
    // Check for proper authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user preferences
    const preferences = await prisma.userPreferences.findUnique({
      where: { user_id: user.id },
    });

    // Return default preferences if none exist
    if (!preferences) {
      return NextResponse.json({
        darkMode: false,
        emailNotifications: true,
        privateProfile: false,
      });
    }

    // Map the DB field names to the frontend names
    return NextResponse.json({
      darkMode: preferences.dark_mode,
      emailNotifications: preferences.email_notifications,
      privateProfile: preferences.profile_privacy,
    });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT /api/user/preferences - Update user preferences
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Check for proper authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate input
    const { darkMode, emailNotifications, privateProfile } = body;

    // Update or create preferences
    const updatedPreferences = await prisma.userPreferences.upsert({
      where: { user_id: user.id },
      update: {
        dark_mode: darkMode !== undefined ? darkMode : undefined,
        email_notifications:
          emailNotifications !== undefined ? emailNotifications : undefined,
        profile_privacy:
          privateProfile !== undefined ? privateProfile : undefined,
      },
      create: {
        user_id: user.id,
        dark_mode: darkMode !== undefined ? darkMode : false,
        email_notifications:
          emailNotifications !== undefined ? emailNotifications : true,
        profile_privacy: privateProfile !== undefined ? privateProfile : false,
      },
    });

    // Map the DB field names to the frontend names
    return NextResponse.json({
      darkMode: updatedPreferences.dark_mode,
      emailNotifications: updatedPreferences.email_notifications,
      privateProfile: updatedPreferences.profile_privacy,
    });
  } catch (error) {
    console.error("Error updating preferences:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
