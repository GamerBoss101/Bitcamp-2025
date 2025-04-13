"use client";

import { useDevice } from "@/lib/context/DeviceContext";
import React, { useEffect, useState } from "react";

const defaultPics = [
	{ src: "/avatar/p1.png", id: 1 },
	{ src: "/avatar/p2.png", id: 2 },
	{ src: "/avatar/p3.png", id: 3 },
	{ src: "/avatar/p4.png", id: 4 },
	{ src: "/avatar/p5.png", id: 5 },
];

const purchasablePics = [
	{ id: 6, src: "/avatar/p6.png", price: 250 },
	{ id: 7, src: "/avatar/p7.png", price: 250 },
	{ id: 8, src: "/avatar/p8.png", price: 2000 },
	{ id: 9, src: "/avatar/p9.png", price: 2000 },
	{ id: 10, src: "/avatar/p10.png", price: 2000 },
	{ id: 11, src: "/avatar/p11.png", price: 2000 },
	{ id: 12, src: "/avatar/p12.png", price: 2000 },
	{ id: 13, src: "/avatar/p13.png", price: 10000 },
	{ id: 14, src: "/avatar/p14.png", price: 10000 },
	{ id: 15, src: "/avatar/p15.png", price: 10000 },
	{ id: 16, src: "/avatar/p16.png", price: 10000 },
];

export default function ShopPage() {
	const { isAuthenticated, session } = useDevice();

	const [points, setPoints] = useState(0);
	const [avatar, setAvatar] = useState(1);
	const [ownedPics, setOwnedPics] = useState<number[]>([]);

	useEffect(() => {
		if (isAuthenticated && session) {
			setPoints(session.points || 0);
			setAvatar(session.avatar || 1);
			setOwnedPics(session.inventory || []);
		}
	}, [session]);

	const handleAvatarSelect = async (id: number) => {
		const formData = new FormData();
		formData.append("avatar", id.toString());

		try {
			const response = await fetch("/api/me", {
				method: "POST",
				body: formData,
			});

			const data = await response.json();
			if (response.ok) {
				alert("Avatar updated successfully!");
				setAvatar(id);
			} else {
				alert(data.message || "Failed to update avatar.");
			}
		} catch (error) {
			console.error("Error updating avatar:", error);
			alert("An error occurred while updating the avatar.");
		}
	};

	const handlePurchase = async (id: number, price: number) => {
		if (points < price) {
			alert("You don't have enough points to purchase this profile picture.");
			return;
		}

		// Update the user's avatar, points, and inventory on the server
		const formData = new FormData();
		formData.append("avatar", id.toString());
		formData.append("points", (points - price).toString());
		formData.append("inventory", id.toString());

		try {
			const response = await fetch("/api/me", {
				method: "POST",
				body: formData,
			});

			const data = await response.json();
			if (response.ok) {
				alert("Profile picture purchased successfully!");
				setPoints(points - price);
				setAvatar(id);
				setOwnedPics(prev => [...prev, id]);
			} else {
				alert(data.message || "Failed to purchase profile picture.");
			}
		} catch (error) {
			console.error("Error purchasing profile picture:", error);
			alert("An error occurred while purchasing the profile picture.");
		}
	};

	return (
		<div className="px-6 py-10 my-10 max-w-full lg:max-w-4xl mx-auto font-sans text-neutral-100">
			{/* User Header */}
			<div className="items-center gap-4 mb-6">
				<div className="w-full text-center bg-[color:var(--color-surface-600)]/60 backdrop-blur-md rounded-xl px-6 py-5 my-6 gap-4 shadow-sm inline-flex items-center">
					<div className="w-16 h-16 rounded-full bg-neutral-800">
						<img
							src={"/avatar/p" + avatar + ".png"}
							alt="Current PFP"
							className="rounded-full w-full h-full object-cover"
						/>
					</div>
					<h1 className="text-2xl font-bold text-[color:var(--color-warning-300)]">
						{isAuthenticated ? session.username : "Username"}
					</h1>
				</div>
			</div>

			{/* Total Points */}
			<div className="bg-[color:var(--color-success-600)] rounded-xl px-6 py-4 mb-8 shadow-sm">
				<h2 className="text-xl font-bold text-[color:var(--color-warning-300)] mb-1">
					Total Points
				</h2>
				<p className="text-lg">{points}</p>
			</div>

			{/* Default Profile Pictures */}
			<div className="mb-8">
				<div className="bg-[color:var(--color-success-600)]/70 backdrop-blur-md rounded-xl px-6 py-5 my-6 shadow-sm">
					<h2 className="text-xl font-semibold text-[color:var(--color-warning-300)] mb-0">
						Default Profile Pics
					</h2>
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
					{defaultPics.map((pfp) => (
						<div
							key={pfp.src}
							className="bg-[color:var(--color-surface-600)] rounded-lg p-3 flex flex-col items-center text-center shadow-sm"
							onClick={() => handleAvatarSelect(pfp.id)}
						>
							<img
								src={pfp.src}
								alt="PFP"
								className="w-32 h-32 object-cover rounded mb-2"
							/>
						</div>
					))}
				</div>
			</div>

			{/* Purchaseable Profile Pictures */}
			<div>
				<div className="bg-[color:var(--color-tertiary-600)]/90 backdrop-blur-md rounded-xl px-6 py-5 my-6 shadow-sm">
					<h2 className="text-xl font-semibold text-[color:var(--color-warning-200)] mb-0">
						Purchase New Profile Pics!
					</h2>
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
					{purchasablePics.map((pic) => (
						<div
							key={pic.id}
							className="bg-[color:var(--color-surface-600)] rounded-lg p-3 flex flex-col items-center text-center shadow-sm"
						>
							<img
								src={pic.src}
								alt="PFP"
								className="w-24 h-24 object-cover rounded mb-2"
							/>
							<p className="text-sm mb-1">{pic.price} pts</p>
							{ownedPics.includes(pic.id) ? (
								<button
									className={`px-3 py-1 ${
										avatar === pic.id
											? "bg-success-700 text-white"
											: "bg-success-600 text-white hover:bg-success-700"
									} text-sm rounded`}
									onClick={() => handleAvatarSelect(pic.id)}
								>
									{avatar === pic.id ? "Selected" : "Select"}
								</button>
							) : (
								<button
									className="px-3 py-1 bg-success-600 text-sm text-white rounded hover:bg-success-700"
									onClick={() => handlePurchase(pic.id, pic.price)}
								>
									Purchase
								</button>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
