"use client";

import { useEffect, useState } from "react";

interface PostProps {
    post: {
        id: string;
        timeStamp: string;
        reactions: { liked: boolean; warned: boolean }[];
        userId: string;
        image: string; // Assuming the image is served as a base64 string or URL
        imageDes: string; // New field for the post description
    };
    onLike: () => void;
    onWarning: () => void;
    onDelete: () => void; // Callback for deleting the post
    userReactions: { liked: boolean; warned: boolean };
    allowReactions: boolean; // New property to toggle reactions
}

export default function Post({
    post,
    onLike,
    onWarning,
    onDelete,
    userReactions,
    allowReactions,
}: PostProps) {
    const [userData, setUserData] = useState<{ username: string; avatar: number } | null>({username: "Loading...", avatar: 1});

    useEffect(() => {
        // Fetch the username and avatar based on the userId
        fetch(`/api/user/${post.userId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.user) {
                    setUserData({
                        username: data.user.username,
                        avatar: data.user.avatar || "/default-avatar.png", // Fallback to a default avatar
                    });
                } else {
                    setUserData({
                        username: "Unknown User",
                        avatar: 1,
                    });
                }
            })
            .catch((err) => {
                console.error("Error fetching user data:", err);
                setUserData({
                    username: "Unknown User",
                    avatar: 1,
                });
            });
    }, [post.userId]);

    return (
        <div className="bg-[color:var(--color-surface-600)]/80 rounded-xl px-6 py-5 shadow-md">
            <div className="flex items-center gap-4 mb-2">
                {/* User Avatar */}
                <img
                    src={"/avatar/p" + userData?.avatar + ".png"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <div>
                    {/* Username */}
                    <p className="font-semibold text-[color:var(--color-warning-300)]">
                        {userData?.username || "Loading..."}
                    </p>
                    {/* Timestamp */}
                    <p className="text-sm text-gray-400">{new Date(post.timeStamp).toLocaleString()}</p>
                </div>
            </div>

            {/* Post Image */}
            {post.image && (
                <img
                    src={"data:image/png;base64," + post.image}
                    alt="Post related"
                    className="w-full max-h-64 object-cover rounded mb-4"
                />
            )}

            {/* Post Description */}
            {post.imageDes && (
                <p className="text-neutral-100 mb-4">{post.imageDes}</p>
            )}

            {/* Post Actions */}
            <div className="flex gap-4 items-center">
                {allowReactions && (
                    <>
                        <button
                            onClick={onLike}
                            className={`px-3 py-1 rounded text-sm ${
                                userReactions.liked
                                    ? "bg-success-800"
                                    : "bg-success-600 hover:bg-primary-600"
                            } text-white`}
                        >
                            👍 Like ({post.reactions.filter((reaction) => reaction.liked).length})
                        </button>
                        <button
                            onClick={onWarning}
                            className={`px-3 py-1 rounded text-sm ${
                                userReactions.warned
                                    ? "bg-red-800"
                                    : "bg-primary-500 hover:bg-red-600"
                            } text-white`}
                        >
                            😭 Stop drinking that ({post.reactions.filter((reaction) => reaction.warned).length})
                        </button>
                    </>
                )}
                <button
                    onClick={onDelete}
                    className="px-3 py-1 rounded text-sm bg-red-600 hover:bg-red-700 text-white"
                >
                    🗑️ Delete
                </button>
            </div>
        </div>
    );
}