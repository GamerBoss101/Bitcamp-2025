"use client";

import React from "react";
import { useDevice } from "@/lib/context/DeviceContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
	const { isAuthenticated, session } = useDevice();

	return (
		<div className="px-6 py-10 max-w-full lg:max-w-1/2 mx-auto font-sans text-neutral-100">
			<div className="bg-[color:var(--color-surface-600)]/70 backdrop-blur-md rounded-xl px-6 py-5 my-6 shadow-sm">
				<h1 className="text-2xl sm:text-3xl font-bold tracking-[-.01em] text-center sm:text-left">
					Hi, {session?.username || ""}!!
				</h1>

				<div className="flex flex-col items-center mt-6">
					{isAuthenticated && (
						<img
							src={"/p" + session?.avatar + ".png"}
							alt="Profile Preview"
							className="w-42 h-42 rounded-full object-cover bg-surface-700"
						/>
					)}
					{/* {uploadMessage && (
						<p className="text-sm text-gray-400 mt-2">{uploadMessage}</p>
					)} */}
				</div>
			</div>

			{/* <p className="mb-6">{bio || "No bio yet..."}</p>

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
			</form> */}

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

			<div className="h-6" />
			<div className="h-6" />
		</div>
	);
}
