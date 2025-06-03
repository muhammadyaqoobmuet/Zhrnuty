import { getDbConnection } from "./db";

export async function getSummaries(userId: string) {
  try {
    const sql = await getDbConnection();
    const summaries =
      await sql`SELECT * FROM pdf_summaries WHERE user_id = ${userId} ORDER BY created_at DESC `;
    console.log("summaries " + summaries);
    if (!summaries) {
      throw new Error("no summaries");
    }
    return summaries;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
export async function getSummariesById(id: string) {
  try {
    // get summaries
    const sql = await getDbConnection();

    const [summary] = await sql`
    SELECT
      id,
      user_id,
      title,
      original_file_url,
      summary_text,
      
      created_at,
      updated_at,
      file_name,
      LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count
    FROM
      pdf_summaries
    WHERE
      id = ${id};
  `;
    if (!summary) {
      throw new Error(" No Summaries Found");
    }
    return summary;
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "something went wrong fetching summaries"
    );
    return null;
  }
}
