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
