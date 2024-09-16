"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import {
  countLikes,
  addLike,
  removeLike,
  isPostLikedByUser,
} from "@/app/actions/like-actions";

interface LikeButtonProps {
  postId: number; // postId is a number
}

function LikeButton({ postId }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [likeActionInProgress, setLikeActionInProgress] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchUserId = () => {
      let storedUserId = localStorage.getItem("userIdForMDXBlog");
      if (!storedUserId) {
        storedUserId = uuidv4(); // Create a new UUID for testing or fallback purposes
        localStorage.setItem("userIdForMDXBlog", storedUserId);
      }
      setUserId(storedUserId);
    };

    fetchUserId();
    fetchTotalLikes();
  }, [postId]);

  useEffect(() => {
    if (userId) {
      checkIfLikedByUser();
    }
  }, [userId]);

  async function fetchTotalLikes() {
    try {
      const response = await countLikes(postId);
      if (response.success && typeof response.count === "number") {
        setTotalLikes(response.count);
      } else {
        setTotalLikes(0); // Default to 0 if there's an error
      }
    } catch (error) {
      console.error("Failed to fetch likes:", error);
      setTotalLikes(0); // Default to 0 in case of failure
    } finally {
      setLoading(false); // Data has been loaded (even if with an error)
    }
  }

  async function checkIfLikedByUser() {
    try {
      const response = await isPostLikedByUser(postId, userId as string);
      if (response.success) {
        setLiked(response.liked); // Set liked status based on the database
      }
    } catch (error) {
      console.error("Failed to check if post is liked by user:", error);
    }
  }

  async function handleLikeAction() {
    if (userId && !likeActionInProgress) {
      setLikeActionInProgress(true); // Start the like action
      const response = await addLike(postId, userId);
      if (response.success) {
        setLiked(true);
        setTotalLikes((prev) => prev + 1); // Increment the total likes
      }
      setLikeActionInProgress(false); // End the like action
    }
  }

  async function handleUnlikeAction() {
    if (userId && !likeActionInProgress) {
      setLikeActionInProgress(true); // Start the unlike action
      const response = await removeLike(postId, userId);
      if (response.success) {
        setLiked(false);
        setTotalLikes((prev) => prev - 1); // Decrement the total likes
      }
      setLikeActionInProgress(false); // End the unlike action
    }
  }

  if (loading) {
    return null; // Hide component while loading
  }

  return (
    <div className="py-8">
      <div>Total Likes: {totalLikes}</div>
      <button
        type="button"
        onClick={() => {
          liked ? handleUnlikeAction() : handleLikeAction();
        }}
        className={`like-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center ${
          liked ? "liked" : "unliked"
        }`}
        disabled={likeActionInProgress} // Disable button while action is in progress
      >
        {liked ? (
          <AiFillLike className="text-xl" />
        ) : (
          <AiOutlineLike className="text-xl" />
        )}
        {liked ? "Liked" : "Like"}
      </button>
    </div>
  );
}

export default LikeButton;
