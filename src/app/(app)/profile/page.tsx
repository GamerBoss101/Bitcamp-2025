"use client";

// const useDevice = () => ({
//   isAuthenticated: true,
//   session: { username: "demo_user" },
// });

import { useDevice } from "@/lib/context/DeviceContext";
import React, { useEffect, useState } from "react";

export default function ProfilePage() {
	const { isAuthenticated, session } = useDevice();
	const [bio, setBio] = useState("");
	const [saved, setSaved] = useState(false);

	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [uploadMessage, setUploadMessage] = useState<string>("");

	useEffect(() => {
		if (isAuthenticated && session?.username) {
			fetch(`/api/user/${session.username}`)
				.then((res) => res.json())
				.then((data) => {
					if (data.bio) setBio(data.bio);
				});
		}
	}, [isAuthenticated, session?.username]);

	const handleBioSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await fetch(`/api/user/${session.username}/bio`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ bio }),
		});
		if (res.ok) setSaved(true);
	};

	return (
		<div className="px-6 py-10 max-w-full lg:max-w-1/2 mx-auto font-sans text-neutral-100">
			<div className="bg-[color:var(--color-surface-600)]/70 backdrop-blur-md rounded-xl px-6 py-5 my-6 shadow-sm">
				<h1 className="text-3xl sm:text-4xl font-bold tracking-[-.01em] text-center sm:text-left">
					Hi, {isAuthenticated ? session.username : ""}!!
				</h1>

				<div className="flex flex-col items-center mt-6">
					{previewUrl ? (
						<img
							src={previewUrl}
							alt="Profile Preview"
							className="w-32 h-32 rounded-full object-cover border border-gray-300"
						/>
					) : (
						<div className="w-32 h-32 rounded-full bg-neutral-800 border border-gray-300" />
					)}
					{uploadMessage && <p className="text-sm text-gray-400 mt-2">{uploadMessage}</p>}
				</div>
			</div>

			<p className="mb-6">{bio || "No bio yet..."}</p>

			<form onSubmit={handleBioSubmit} className="mb-6 space-y-2">
				<textarea
					className="w-full p-2 rounded bg-neutral-800 text-white"
					value={bio}
					onChange={(e) => setBio(e.target.value)}
					placeholder="Update your bio..."
					rows={3}
				/>
				<button
					type="submit"
					className="px-4 py-2 bg-success-600 text-white rounded"
				>
					Save Bio
				</button>
				{saved && <p className="text-green-400 text-sm">Bio saved!</p>}
			</form>

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
					 --------------------Daily Stats---------------------
				</h2>
				<ul className="list-disc pl-5 text-neutral-200 space-y-1">
					<li>Points Logged: [ dailyPoints variable ]</li>
					<li>Caffeine Logged (mg): [ daily caffeine variable ]</li>
					<li>Sugar Logged (g): [ daily sugar variable ]</li>
				</ul>
			</div>

			<div className="h-6" />
			<div className="h-6" />
		</div>
	);
}
