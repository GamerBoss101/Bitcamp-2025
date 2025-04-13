"use client";

import { useDevice } from "@/lib/context/DeviceContext";
import React, { useEffect, useState } from "react";
import Post from "../../../lib/components/Post";

export default function PostsPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [userReactions, setUserReactions] = useState<{
        [index: number]: { liked: boolean; warned: boolean };
    }>({});
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [alertMessage, setAlertMessage] = useState<string | null>(null); // State for alert message
    const { isAuthenticated, session } = useDevice();

    // Fetch posts on component mount
    useEffect(() => {
        if (isAuthenticated && session?.id) {
            fetch(`/api/post`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.posts) {
                        setPosts(data.posts);
                    } else {
                        console.error("Failed to fetch posts:", data.message);
                    }
                })
                .catch((err) => {
                    console.error("Error fetching posts:", err);
                });
        }
    }, [isAuthenticated, session?.id]);

    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!imageFile) {
            setAlertMessage("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const response = await fetch("/api/post", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setAlertMessage(`Post uploaded successfully! You earned ${data.points} points!`);
                setPosts([data.postData, ...posts]); // Add the new post to the list
                setImageFile(null); // Clear the file input
            } else {
                setAlertMessage(data.message || "Failed to upload post.");
            }
        } catch (error) {
            console.error("Error uploading post:", error);
            setAlertMessage("An error occurred while uploading the post.");
        }
    };

    const handleLike = async (index: number) => {
        const post = posts[index];
        const reactions = { ...userReactions };

        try {
            const response = await fetch(`/api/post/${post.id}`, {
                method: "POST",
                body: new URLSearchParams({ like: "true" }),
            });

            if (response.ok) {
                const updatedPosts = [...posts];
                const alreadyLiked = reactions[index]?.liked;

                // Update reactions in the post
                updatedPosts[index].reactions.push({ liked: !alreadyLiked, warned: false });

                // Update local state
                reactions[index] = {
                    ...reactions[index],
                    liked: !alreadyLiked,
                };

                setPosts(updatedPosts);
                setUserReactions(reactions);
            } else {
                const data = await response.json();
                alert(data.message || "Failed to like the post.");
            }
        } catch (error) {
            console.error("Error liking post:", error);
            alert("An error occurred while liking the post.");
        }
    };

    const handleWarning = async (index: number) => {
        const post = posts[index];
        const reactions = { ...userReactions };

        try {
            const response = await fetch(`/api/post/${post.id}`, {
                method: "POST",
                body: new URLSearchParams({ warn: "true" }),
            });

            if (response.ok) {
                const updatedPosts = [...posts];
                const alreadyWarned = reactions[index]?.warned;

                // Update reactions in the post
                updatedPosts[index].reactions.push({ liked: false, warned: !alreadyWarned });

                // Update local state
                reactions[index] = {
                    ...reactions[index],
                    warned: !alreadyWarned,
                };

                setPosts(updatedPosts);
                setUserReactions(reactions);
            } else {
                const data = await response.json();
                alert(data.message || "Failed to warn the post.");
            }
        } catch (error) {
            console.error("Error warning post:", error);
            alert("An error occurred while warning the post.");
        }
    };

    const handleDelete = async (index: number) => {
        const post = posts[index];

        try {
            const response = await fetch(`/api/post/${post.id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Post deleted successfully!");
                const updatedPosts = [...posts];
                updatedPosts.splice(index, 1); // Remove the deleted post from the list
                setPosts(updatedPosts);
            } else {
                const data = await response.json();
                alert(data.message || "Failed to delete the post.");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("An error occurred while deleting the post.");
        }
    };

    return (
        <div className="px-6 py-10 max-w-full lg:max-w-2xl mx-auto font-sans text-neutral-100">
            <div className="bg-[color:var(--color-surface-700)]/70 backdrop-blur-md rounded-xl px-6 py-5 mb-8 shadow-sm">
                <h1 className="text-3xl sm:text-4xl font-bold mb-0 text-[color:var(--color-warning-300)]">
                    Posts
                </h1>
            </div>

            {/* Alert Message */}
            {alertMessage && (
                <div className="bg-success-600 text-white px-4 py-3 rounded mb-6">
                    {alertMessage}
                </div>
            )}

            <div className="bg-[color:var(--color-surface-600)]/70 backdrop-blur-md rounded-xl px-6 py-5 mb-8 shadow-sm">
                <form onSubmit={handlePostSubmit} className="space-y-3">
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full p-2 rounded bg-neutral-800 text-white"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 w-full bg-success-600 text-white rounded font-semibold"
                    >
                        Post
                    </button>
                </form>
            </div>

            {/* Post List Card */}
            <div className="bg-[color:var(--color-surface-800)] rounded-xl px-6 py-5 shadow-md">
                <h2 className="text-2xl font-bold text-[color:var(--color-warning-300)] mb-4">
                    Post List
                </h2>
                <div className="space-y-6">
                    {posts
                        .slice() // Create a shallow copy of the posts array
                        .sort((a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()) // Sort by timeStamp in descending order
                        .map((post, index) => (
                            <Post
                                allowReactions={false}
                                key={index}
                                post={post}
                                onLike={() => handleLike(index)}
                                onWarning={() => handleWarning(index)}
                                onDelete={() => handleDelete(index)} // Pass the delete handler
                            />
                        ))}
                </div>
            </div>

            <div className="h-10" />
        </div>
    );
}
