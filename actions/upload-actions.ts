"use server";

import { getDbConnection } from "@/lib/db";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { File } from "node:buffer";

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
    console.log(userId, fileUrl, summary, title, fileName);

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
