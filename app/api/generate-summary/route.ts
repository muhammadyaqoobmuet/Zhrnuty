import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_GOD_MODE_PROMPT } from "@/lib/promt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { pdfText } = await request.json();

    const apiKey = process.env.NEXT_GEMINI_API_KEY; // This works server-side
    if (!apiKey) {
      return NextResponse.json({ error: "API key not set" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: {
        role: "system",
        parts: [{ text: SUMMARY_GOD_MODE_PROMPT }],
      },
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Hey, transform this content into a short, visually engaging, high-impact summary using relevant emojis and proper markdown formatting. Make sure it's easy to scan, intellectually sharp, and hits the core ideas with insight and clarity.\n\n${pdfText}`,
            },
          ],
        },
      ],
    });

    const text = result.response.text();
    return NextResponse.json({ summary: text });
  } catch (error: any) {
    console.error("Gemini Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
