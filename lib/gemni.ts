// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { SUMMARY_GOD_MODE_PROMPT } from "./promt";

// export async function generateSummaryFromGeminiApi(pdfText: string) {
//   const apiKey: any = process.env.NEXT_LENDI;

//   if (!apiKey) {
//     throw new Error("GEMINI_API_KEY environment variable is not set.");
//   }
//   const genAI = new GoogleGenerativeAI(apiKey);
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.0-flash",
//       systemInstruction: {
//         role: "system",
//         parts: [{ text: SUMMARY_GOD_MODE_PROMPT }],
//       },
//     });

//     const result = await model.generateContent({
//       contents: [
//         {
//           role: "user",
//           parts: [
//             {
//               text: `Hey, transform this content into a short, visually engaging, high-impact summary using relevant emojis and proper markdown formatting. Make sure it’s easy to scan, intellectually sharp, and hits the core ideas with insight and clarity.\n\n${pdfText}`,
//             },
//           ],
//         },
//       ],
//     });

//     const text = result.response.text();
//     console.log("from genmni" + text);
//     return text;
//   } catch (error: any) {
//     console.error("Gemini Error:", error.message);
//     throw error;
//   }
// }
