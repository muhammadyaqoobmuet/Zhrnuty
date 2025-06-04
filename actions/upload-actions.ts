"use server";

import { getDbConnection } from "@/lib/db";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { SUMMARY_GOD_MODE_PROMPT } from "@/lib/promt";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import { File } from "node:buffer";


// Cache auth result to avoid repeated calls
let cachedAuth: { userId: string | null; timestamp: number } | null = null;
const AUTH_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getCachedAuth() {
  const now = Date.now();
  
  if (cachedAuth && (now - cachedAuth.timestamp) < AUTH_CACHE_DURATION) {
    return cachedAuth.userId;
  }
  
  try {
    const { userId } = await auth();
    cachedAuth = { userId, timestamp: now };
    return userId;
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}


// Optimized AI summary generation with retry and timeout
async function generateAISummary(pdfText: string, retries = 2): Promise<string> {
  const apiKey = process.env.NEXT_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("AI service not configured");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: {
      role: "system",
      parts: [{ text: SUMMARY_GOD_MODE_PROMPT }],
    },
  });

  // Chunk large text to avoid API limits
  const maxChunkSize = 30000; // Adjust based on Gemini limits
  const chunks = pdfText.length > maxChunkSize 
    ? [pdfText.substring(0, maxChunkSize) + "..."] 
    : [pdfText];

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await Promise.race([
        model.generateContent({
          contents: [{
            role: "user",
            parts: [{
              text: `Transform this content into a concise, engaging summary with emojis and markdown formatting:\n\n${chunks[0]}`,
            }],
          }],
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("AI request timeout")), 30000)
        ),
      ]) as any;

      return result.response.text();
    } catch (error) {
      if (attempt === retries) {
        throw new Error(`AI generation failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }
  
  throw new Error("AI generation failed after retries");
}



// Create a consistent UUID from Clerk user ID
export async function genratePdfSummary(
  uploadResponse: [
    {
      serverData: {
        userId: string;
        fileUrl: string;
        fileName: string;
        file: File; // Assuming File is a type that represents the uploaded file
      };
    }
  ]
) {
  console.log("upload resp " + uploadResponse[0].serverData.file);
  if (!uploadResponse || !uploadResponse[0].serverData) {
    return {
      success: false,
      message: "file upload failed ",
      data: null,
    };
  }

  const {
    serverData: { userId, fileUrl: pdfUrl, fileName },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "Invalid file data masla ",
      data: null,
    };
  }

  try {
    const formatedFileName = formatFileNameAsTitle(fileName);
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    return {
      success: true,
      message: " Summary Genrated!",
      data: {
        title: formatedFileName,
        summary: pdfText,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error,
      data: null,
    };
  }
}

export async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) {
  // sql statment for inserting and storing
  try {


    const sql = await getDbConnection();
    const results = await sql`INSERT INTO pdf_summaries(
      user_id,
      original_file_url,
      summary_text,
      title,
      file_name
    ) VALUES (
      ${userId},
      ${fileUrl},
      ${summary},
      ${title},
      ${fileName}
    )  RETURNING id, user_id, original_file_url, summary_text, title, file_name, created_at;`;

    console.log("results" + results[0]);

    return results[0];
  } catch (error) {
    console.error("error saving pdf summary", error);
  }
}

// Single optimized action that handles everything
export async function processUploadedPdf({
  uploadData,
  fileName,
}: {
  uploadData: {
    userId: string;
    fileUrl: string;
    fileName: string;
  };
  fileName: string;
}) {
  try {
    // Get user ID from cache
    const userId = await getCachedAuth();
    if (!userId) {
      return {
        success: false,
        message: "Authentication required",
        data: null,
      };
    }

    const { fileUrl } = uploadData;
    if (!fileUrl) {
      return {
        success: false,
        message: "Invalid file URL",
        data: null,
      };
    }

    // Process PDF text extraction and AI summary in parallel where possible
    const formattedTitle = formatFileNameAsTitle(fileName);
    
    // Extract PDF text
    const pdfText = await fetchAndExtractPdfText(fileUrl);
    if (!pdfText || pdfText.length < 10) {
      return {
        success: false,
        message: "Could not extract text from PDF",
        data: null,
      };
    }

    // Generate AI summary
    const aiSummary = await generateAISummary(pdfText);
    if (!aiSummary) {
      return {
        success: false,
        message: "Could not generate summary",
        data: null,
      };
    }

    // Save to database
    const savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary: aiSummary,
      title: formattedTitle,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save summary",
        data: null,
      };
    }

    // Revalidate path for fresh data
    revalidatePath(`/summaries/${savedSummary.id}`);

    return {
      success: true,
      message: "PDF processed successfully",
      data: {
        id: savedSummary.id,
        title: formattedTitle,
        summary: aiSummary,
      },
    };

  } catch (error) {
    console.error("PDF processing error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Processing failed",
      data: null,
    };
  }
}



export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: {
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) {
  // check is user logined with specific user id >
  //  savePdfSummary
  // savePdfSummary()

  console.log("checkingTpye storePdf" + fileUrl, summary, title, fileName);
  let savedPdfSummary: any;

  try {
    const { userId } = await auth();
    if (!userId) {
      // no user id
      return {
        success: false,
        message: " user not found !",
      };
    }

    savedPdfSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    console.log("savedPdfSummaryResutl " + savedPdfSummary);

    if (!savedPdfSummary) {
      return {
        success: false,
        message: "falied to save the pdf summary please brotha try again",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : " error while storing to database",
    };
  }

  revalidatePath(`/summaries/${savedPdfSummary?.id}`);

  return {
    success: true,
    message: " saved the pdf summary 🎉🎉🎉",
    data: {
      id: savedPdfSummary.id,
    },
  };
}
