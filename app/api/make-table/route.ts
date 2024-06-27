import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE IF NOT EXISTS likes_for_test (
        id SERIAL PRIMARY KEY,
        postId INT NOT NULL,
        userId INT NOT NULL
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
