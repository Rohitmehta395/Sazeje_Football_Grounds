import { NextRequest, NextResponse } from "next/server";
import { translateText, translateBatch } from "@/lib/services/translate";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const from = typeof body.from === "string" ? body.from : "nl";
    const to = typeof body.to === "string" ? body.to : "en";

    // Handle batch translation
    if (Array.isArray(body.texts)) {
      const texts = body.texts.map((t: unknown) => String(t || ""));
      const translations = await translateBatch(texts, from, to);
      return NextResponse.json({
        success: true,
        translations,
      });
    }

    // Handle single string translation
    if (typeof body.text === "string") {
      const translation = await translateText(body.text, from, to);
      return NextResponse.json({
        success: true,
        translation,
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid payload: provide 'text' string or 'texts' array." },
      { status: 400 }
    );
  } catch (error) {
    console.error("[API /api/translate] Translation error:", error);
    return NextResponse.json(
      { success: false, error: "Internal translation error" },
      { status: 500 }
    );
  }
}
