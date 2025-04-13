"use client";

import { useEffect, useState } from "react";
import { useDevice } from "@/lib/context/DeviceContext";

function Mobile() {
	const { isAuthenticated, session } = useDevice();
	const [bio, setBio] = useState(session?.bio || "");
	const [username, setUsername] = useState(session?.username || "");

	useEffect(() => {
		if (session) {
			setBio(session.bio || "");
			setUsername(session.username || "");
		}
	}, [session]);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (bio.length > 0 || username.length > 0) {
			const formData = new FormData();
			if (bio.length > 0) formData.append("bio", bio);
			if (username.length > 0) formData.append("username", username);

			fetch("/api/me", {
				method: "POST",
				body: formData, // Automatically sets Content-Type to multipart/form-data
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.message === "User updated successfully") {
						alert("Profile updated successfully!");
					} else {
						alert("Failed to update profile.");
					}
				})
				.catch((err) => {
					console.error("Error updating profile:", err);
					alert("An error occurred while updating your profile.");
				});
		} else {
			alert("Please enter a bio or username.");
		}
	}

	return (
		<div className="px-6 py-10 my-10 max-w-full lg:max-w-1/2 mx-auto font-sans text-neutral-100">
			<div className="bg-[color:var(--color-surface-600)]/70 backdrop-blur-md rounded-xl px-6 py-5 my-6 shadow-sm">
				<h1 className="text-2xl sm:text-3xl font-bold tracking-[-.01em] text-center">
					Hi, {username || ""}!!
				</h1>

				<div className="flex flex-col items-center mt-6 my-4">
					{isAuthenticated && (
						<img
							src={"/avatar/p" + session?.avatar + ".png"}
							alt="Profile Preview"
							className="w-42 h-42 rounded-full object-cover bg-surface-700"
						/>
					)}
				</div>

				<form onSubmit={handleSubmit} className="mb-6 space-y-4">
					{/* Username Input */}
					<input
						type="text"
						className="w-full p-2 rounded bg-neutral-800 text-white"
						onChange={(e) => setUsername(e.target.value)}
						value={username || ""}
						placeholder="Update your username..."
					/>

					{/* Bio Input */}
					<textarea
						className="w-full p-2 rounded bg-neutral-800 text-white"
						onChange={(e) => setBio(e.target.value)}
						value={bio || ""}
						placeholder="Update your bio..."
						rows={3}
					/>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full px-4 py-2 bg-success-600 text-white rounded"
					>
						Save Profile
					</button>
				</form>
			</div>

			{/* Friends */}
			<div className="bg-[color:var(--color-surface-600)] rounded-xl px-6 py-5 my-6 shadow-md">
				<h2 className="text-3xl font-bold tracking-[-.01em] text-[color:var(--color-warning-300)]">
					Friends
				</h2>
				<p className="text-lg text-neutral-100">[ friendsCount variable ]</p>
			</div>

			{/* Total Points */}
			<div className="bg-[color:var(--color-success-600)] rounded-xl px-6 py-6 my-6 shadow-md">
				<h2 className="text-3xl font-bold text-[color:var(--color-warning-300)] mb-2">
					Total Points
				</h2>
				<p className="text-lg text-neutral-100">[ totalPoints variable? ]</p>
			</div>

			{/* Daily Stats */}
			<div className="bg-[color:var(--color-surface-600)]/70 backdrop-blur-md rounded-xl px-6 py-5 my-6 shadow-sm">
				<h2 className="text-xl font-semibold text-[color:var(--color-warning-300)] mt-0 mb-2">
					Daily Stats
				</h2>
				<ul className="list-disc pl-5 text-neutral-200 space-y-1">
					<li>Points Logged: [ dailyPoints variable ]</li>
					<li>Caffeine Logged (mg): [ daily caffeine variable ]</li>
					<li>Sugar Logged (g): [ daily sugar variable ]</li>
				</ul>
				<p className="font-semibold italic text-[color:var(--color-success-300)] mt-1">
					Don't forget you have a 400mg caffeine limit and 30.5g sugar limit!
				</p>
			</div>
			<div>
				<button type="button" className="btn bg-surface-800 w-full">
					<a href="/auth/logout">Logout</a>
				</button>
			</div>
		</div>
	);
}

function Web() {
	const { isAuthenticated, session } = useDevice();

	return (
		<main className="flex flex-col row-start-2 items-center mt-10">
			<h1 className="text-3xl sm:text-4xl font-bold tracking-[-.01em] text-center sm:text-left text-white">
				{isAuthenticated ? `Welcome, ${session.username} !!` : ""}
			</h1>
			<span className="text-white">
				Use the mobile app for a better experience!
			</span>
		</main>
	);
}

export default function ProfilePage() {
	const { isMobile, isSafari } = useDevice();
	if (isMobile && isSafari) return Mobile();
	else return Mobile();
}
