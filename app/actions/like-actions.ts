"use server";
import { sql } from "@vercel/postgres";

export async function countLikes(postId: number) {
  console.log("countLikes", postId);
  try {
    const result = await sql`
      SELECT COUNT(*) as count FROM likes_for_test
      WHERE postid = ${postId};
    `;
    console.log("countLikes result:", result);
    if (result.rows && result.rows.length > 0) {
      return {
        success: true,
        count: Number.parseInt(result.rows[0].count, 10),
      };
    }
    return { success: false, error: "No results found" };
  } catch (error) {
    console.error("Error in countLikes:", (error as Error).message);
    return { success: false, error: (error as Error).message };
  }
}

export async function createTable() {
  console.log("createTable");
  try {
    const result = await sql`
      CREATE TABLE IF NOT EXISTS likes_for_test (
        postid INT,
        userid VARCHAR(255)
      );
    `;
    return { success: true, result };
  } catch (error) {
    console.error("Error in createTable:", (error as Error).message);
    return { success: false, error: (error as Error).message };
  }
}

export async function removeTable() {
  console.log("removeTable");
  try {
    const result = await sql`
      DROP TABLE IF EXISTS likes_for_test;
    `;
    return { success: true, result };
  } catch (error) {
    console.error("Error in removeTable:", (error as Error).message);
    return { success: false, error: (error as Error).message };
  }
}

export async function addLike(postId: number, userId: string) {
  console.log("addLike", postId, userId);
  try {
    if (!postId || !userId) {
      throw new Error("Missing postId or userId");
    }

    const result = await sql`
      INSERT INTO likes_for_test (postid, userid)
      VALUES (${postId}, ${userId});
    `;

    return { success: true, result };
  } catch (error) {
    console.error("Error in addLike:", (error as Error).message);
    return { success: false, error: (error as Error).message };
  }
}

export async function removeLike(postId: number, userId: string) {
  console.log("removeLike", postId, userId);
  try {
    if (!postId || !userId) {
      throw new Error("Missing postId or userId");
    }

    const result = await sql`
      DELETE FROM likes_for_test
      WHERE postid = ${postId} AND userid = ${userId};
    `;

    return { success: true, result };
  } catch (error) {
    console.error("Error in removeLike:", (error as Error).message);
    return { success: false, error: (error as Error).message };
  }
}

export async function removeAllLikes() {
  console.log("removeAllLikes");
  try {
    const result = await sql`
      DELETE FROM likes_for_test;
    `;
    return { success: true, result };
  } catch (error) {
    console.error("Error in removeAllLikes:", (error as Error).message);
    return { success: false, error: (error as Error).message };
  }
}

export async function isPostLikedByUser(postId: number, userId: string) {
  console.log("isPostLikedByUser", postId, userId);
  try {
    const result = await sql`
      SELECT 1 FROM likes_for_test
      WHERE postid = ${postId} AND userid = ${userId}
      LIMIT 1;
    `;

    if (result.rows && result.rows.length > 0) {
      return { success: true, liked: true }; // If a row is returned, the post is liked.
    }

    return { success: true, liked: false }; // If no row is returned, the post is not liked.
  } catch (error) {
    console.error("Error in isPostLikedByUser:", (error as Error).message);
    return { success: false, error: (error as Error).message, liked: false };
  }
}
