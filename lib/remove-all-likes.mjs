import { sql } from "@vercel/postgres";
import dotenv from "dotenv";

dotenv.config();

async function removeAllLikes() {
  try {
    const result = await sql`
      DELETE FROM likes_for_test;
    `;
    console.log("All likes removed:", result);
  } catch (error) {
    console.error("Error removing likes:", error.message);
  }
}

removeAllLikes();
