"use client";

import { useDevice } from "@/lib/context/DeviceContext";
import React, { useEffect, useState } from "react";
import Post from "../../lib/components/Post";

function Mobile() {
    const { isAuthenticated, session } = useDevice();
    const [friendsPostsData, setFriendsPosts] = useState<any[]>([]);

    // Fetch friends' posts
    function getFriendsPosts(friendId: any) {
        fetch(`/api/user/${friendId}/posts`)
            .then((res) => res.json())
            .then((data) => {
                if (data.posts) {
                    setFriendsPosts((prevPosts) => [...prevPosts, ...data.posts]);
                } else {
                    console.error("No posts found for friend ID:", friendId);
                }
            })
            .catch((err) => {
                console.error("Error fetching friend's posts:", err);
            });
    }

    useEffect(() => {
        if (isAuthenticated && session) {
            const friendsIds = session.friends.map((friend: any) => friend);

            friendsIds.forEach((friendId: any) => {
                getFriendsPosts(friendId);
            });
        }
    }, [isAuthenticated, session]);

    // Handler for liking a post
    const handleLike = async (postId: string) => {
        try {
            const response = await fetch(`/api/post/${postId}`, {
                method: "POST",
                body: new URLSearchParams({ like: "true" }),
            });

            if (response.ok) {
                setFriendsPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.id === postId
                            ? {
                                  ...post,
                                  reactions: [...post.reactions, { liked: true, warned: false }],
                              }
                            : post
                    )
                );
            } else {
                const data = await response.json();
                console.error(data.message || "Failed to like the post.");
            }
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    // Handler for warning a post
    const handleWarning = async (postId: string) => {
        try {
            const response = await fetch(`/api/post/${postId}`, {
                method: "POST",
                body: new URLSearchParams({ warn: "true" }),
            });

            if (response.ok) {
                setFriendsPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.id === postId
                            ? {
                                  ...post,
                                  reactions: [...post.reactions, { liked: false, warned: true }],
                              }
                            : post
                    )
                );
            } else {
                const data = await response.json();
                console.error(data.message || "Failed to warn the post.");
            }
        } catch (error) {
            console.error("Error warning post:", error);
        }
    };

    return (
        <main className="flex flex-col gap-[32px] my-20 row-start-2 items-center mt-10 text-white">
            <img
                src="/drinkhappylogo.png"
                alt="Drink Happy Logo Image"
                className="h-auto mx-auto my-auto w-3/4 lg:w-1/3"
            />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-[-.01em] text-center sm:text-left">
                {isAuthenticated ? `Welcome, ${session.username} !!` : ""}
            </h1>
            {!isAuthenticated ? (
                <div className="flex gap-4">
                    <button type="button" className="btn bg-surface-500">
                        <a href="/auth/login?screen_hint=signup">Sign up</a>
                    </button>
                    <button type="button" className="btn bg-surface-500">
                        <a href="/auth/login?screen_hint=login">Log in</a>
                    </button>
                </div>
            ) : (
                <div className="w-full px-2">
                    <div className="bg-[color:var(--color-surface-800)] rounded-xl px-4 py-5 shadow-md">
                        <h2 className="text-2xl font-bold text-center text-[color:var(--color-warning-300)] mb-4">
                            Activity Feed
                        </h2>
                        <div className="space-y-6">
                            {friendsPostsData.map((post, index) => (
                                <Post
                                    showDeleteButton={false} // No delete option for friends' posts
                                    key={index}
                                    post={post}
                                    allowReactions={true} // Allow reactions for friends' posts
                                    onLike={() => handleLike(post.id)} // Pass the like handler
                                    onWarning={() => handleWarning(post.id)} // Pass the warning handler
                                    onDelete={() => {}} // No delete option for friends' posts
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

function Web() {

    const { isAuthenticated, session } = useDevice();

	return (
		<main className="flex flex-col gap-[32px] my-20 row-start-2 items-center mt-10 text-white">
			<img
				src="/drinkhappylogo.png"
				alt="Drink Happy Logo Image"
				className="h-auto mx-auto my-auto w-3/4 lg:w-1/3"
			/>
			<h1 className="text-3xl sm:text-4xl font-bold tracking-[-.01em] text-center sm:text-left">
                {isAuthenticated ? `Welcome, ${session.username} !!` : ""}
			</h1>
		</main>
	);
}

export default function Home() {
	const { isMobile, isSafari } = useDevice();

	if(isMobile && isSafari) return Mobile();
	else return Web();
}
