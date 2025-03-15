import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const lowerMessage = message.toLowerCase();

    // Baca database chatbot.json
    const filePath = path.join(process.cwd(), "public", "chatbot.json");
    const chatbotData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Cek apakah pertanyaan ada di JSON
    if (chatbotData[lowerMessage]) {
      return NextResponse.json({ reply: chatbotData[lowerMessage] });
    }

    return NextResponse.json({
      reply: "Maaf, saya tidak memiliki jawaban untuk itu.",
    });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { reply: "Terjadi kesalahan di server." },
      { status: 500 }
    );
  }
}
