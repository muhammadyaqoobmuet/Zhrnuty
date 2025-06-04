"use server";

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction({
  summaryId,
}: {
  summaryId: string;
}) {
  try {
    console.log(summaryId);
    const sql = await getDbConnection();
    const user = await currentUser();

    if (!user?.id) {
      throw new Error("User not Found");
    }

    // delete from db
    const results = await sql`DELETE FROM pdf_summaries
              WHERE id = ${summaryId}
              AND user_id = ${user?.id}
              RETURNING id; `;
    
    if (results.length > 0) {
      revalidatePath("/dashboard");
      return {
        success: true,
        data: {
          summaryId: results,
        },
      };
    }
  } catch (error) {
    console.log(
      error instanceof Error
        ? error.message
        : "something wrong on deleting the summary"
    );
  }
  return {
    success: false,
    message: "error deleting the summary",
  };
}
