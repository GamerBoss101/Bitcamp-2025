"use client";

import { useDevice } from "@/lib/context/DeviceContext";
import React, { useEffect, useState } from "react";
import Post from "../../lib/components/Post";

function Mobile() {
	const { isAuthenticated, session } = useDevice();
	const [friendsPostsData, setFriendsPosts] = useState<any[]>([]);

	function getFriendsPosts(friendId: any) {
		fetch(`/api/user/${friendId}/posts`)
			.then((res) => res.json())
			.then((data) => {
				if (data.posts) {
					setFriendsPosts([...friendsPostsData, ...data.posts]);
				} else {
					console.error("No posts found for friend ID:", friendId);
				}
			})
			.catch((err) => {
				console.error("Error fetching friend's posts:", err);
			});
	}

	// Fetch friends' posts
	useEffect(() => {
		if (isAuthenticated && session) {
			let friendsIds = session.friends.map((friend: any) => friend);

			console.log("Friends IDs:", friendsIds);

			// use /api/users/:id to get friend data
			friendsIds.forEach((friendId: any) => {
				fetch(`/api/user/${friendId}`)
					.then((res) => res.json())
					.then((data) => {
						if (data.user) {
							getFriendsPosts(data.user.id);
						} else {
							console.error("No user data found for friend ID:", friendId);
						}
					})
					.catch((err) => {
						console.error("Error fetching friend data:", err);
					});
			});
		}
	}, [isAuthenticated, session]);

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
				<div className="w-full px-6">
					<h2 className="text-2xl font-bold text-[color:var(--color-warning-300)] mb-4">
						Activity Feed
					</h2>
					<div className="space-y-6">
						{friendsPostsData.map((post, index) => (
							<Post
								key={index}
								post={post}
								allowReactions={true} // Allow reactions for friends' posts
								onLike={() => console.log("Liked post:", post.id)}
								onWarning={() => console.log("Warned post:", post.id)}
								onDelete={() => {}} // No delete option for friends' posts
							/>
						))}
					</div>
				</div>
			)}
		</main>
	);
}

function Web() {
	const { isAuthenticated, session } = useDevice();

	return (
		<main className="flex flex-col row-start-2 items-center mt-10">
			<img
				src="/drinkhappylogo.png"
				alt="Drink Happy Logo Image"
				className="h-auto mx-auto w-3/4 lg:w-1/3"
			/>
			<h1 className="text-3xl sm:text-4xl font-bold tracking-[-.01em] text-center sm:text-left text-white">
				{isAuthenticated ? `Welcome, ${session.username} !!` : ""}
			</h1>
		</main>
	);
}

export default function Home() {
	const { isMobile, isSafari } = useDevice();
	if (isMobile && isSafari) return Mobile();
	else return Mobile();
}
