"use client";

import { useDevice } from "@/lib/context/DeviceContext";

import React, { useEffect, useState } from "react";

export default function PostsPage() {
	const [postText, setPostText] = useState("");
	const [posts, setPosts] = useState<any[]>([]);
	const [userReactions, setUserReactions] = useState<{
		[index: number]: { liked: boolean; warned: boolean };
	}>({});
	const { isAuthenticated, session } = useDevice();

	useEffect(() => {
		if (isAuthenticated && session?.username) {
			fetch(`/api/user/${session.username}`).then((res) => res.json());
		}
	}, [isAuthenticated, session?.username]);

	const handlePostSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newPost = {
			text: postText,
			date: new Date().toLocaleString(),
			likes: 0,
			warnings: 0,
			imageUrl: "", // placeholder for image logick
			author: session.username, // add username to track authorship
		};
		setPosts([newPost, ...posts]);
		setPostText("");
	};

	const handleLike = (index: number) => {
		const updatedPosts = [...posts];
		const reactions = { ...userReactions };

		const alreadyLiked = reactions[index]?.liked;

		updatedPosts[index].likes += alreadyLiked ? -1 : 1;

		reactions[index] = {
			...reactions[index],
			liked: !alreadyLiked,
		};

		setPosts(updatedPosts);
		setUserReactions(reactions);
	};

	const handleWarning = (index: number) => {
		const updatedPosts = [...posts];
		const reactions = { ...userReactions };

		const alreadyWarned = reactions[index]?.warned;

		updatedPosts[index].warnings += alreadyWarned ? -1 : 1;

		reactions[index] = {
			...reactions[index],
			warned: !alreadyWarned,
		};

		setPosts(updatedPosts);
		setUserReactions(reactions);
	};

	return (
		<div className="px-6 py-10 max-w-full lg:max-w-2xl mx-auto font-sans text-neutral-100">
			<div className="bg-[color:var(--color-surface-700)]/70 backdrop-blur-md rounded-xl px-6 py-5 mb-8 shadow-sm">
				<h1 className="text-3xl sm:text-4xl font-bold mb-0 text-[color:var(--color-warning-300)]">
					Posts
				</h1>
			</div>

			<div className="bg-[color:var(--color-surface-600)]/70 backdrop-blur-md rounded-xl px-6 py-5 mb-8 shadow-sm">
				<form onSubmit={handlePostSubmit} className="space-y-3">
					<textarea
						className="w-full p-3 rounded bg-neutral-800 text-white"
						placeholder="Share your beverage..."
						value={postText}
						onChange={(e) => setPostText(e.target.value)}
						rows={4}
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-success-600 text-white rounded font-semibold"
					>
						Post
					</button>
				</form>
			</div>

			<div className="space-y-6">
				{posts.map((post, index) => (
					<div
						key={index}
						className="bg-[color:var(--color-surface-600)]/80 rounded-xl px-6 py-5 shadow-md"
					>
						<div className="flex items-center gap-4 mb-2">
							<div className="w-10 h-10 rounded-full bg-neutral-800 border border-gray-300" />
							<div>
								<p className="font-semibold text-[color:var(--color-warning-300)]">
									{post.author || "Anonymous"}
								</p>
								<p className="text-sm text-gray-400">{post.date}</p>
							</div>
						</div>

						{post.imageUrl && (
							<img
								src={post.imageUrl}
								alt="Post related"
								className="w-full max-h-64 object-cover rounded mb-4"
							/>
						)}

						<p className="text-base text-neutral-100 mb-4">{post.text}</p>

						<div className="flex gap-4 items-center">
							<button
								onClick={() => handleLike(index)}
								className={`px-3 py-1 rounded text-sm ${
									userReactions[index]?.liked
										? "bg-success-800"
										: "bg-success-600 hover:bg-primary-600"
								} text-white`}
							>
								👍 Like ({post.likes})
							</button>
							<button
								onClick={() => handleWarning(index)}
								className={`px-3 py-1 rounded text-sm ${
									userReactions[index]?.warned
										? "bg-red-800"
										: "bg-primary-500 hover:bg-red-600"
								} text-white`}
							>
								😭 Stop drinking that ({post.warnings})
							</button>
						</div>
					</div>
				))}
			</div>

			<div className="h-10" />
		</div>
	);
}
