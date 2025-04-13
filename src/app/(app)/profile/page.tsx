"use client";

import { useEffect, useState } from "react";
import { useDevice } from "@/lib/context/DeviceContext";
import FriendRequest from "./FriendRequest";
import Friend from "./Friend";

function Mobile() {
	const { isAuthenticated, session } = useDevice();
	const [bio, setBio] = useState(session?.bio || "");
	const [username, setUsername] = useState(session?.username || "");
	const [points, setPoints] = useState(session?.points || 0);
	const [friends, setFriends] = useState(session?.friends || []);
	const [requests, setRequests] = useState(session?.requests || []);
	const [friendCode, setFriendCode] = useState(""); // Input for sending friend requests

	useEffect(() => {
		if (isAuthenticated && session) {
			setBio(session.bio || "");
			setUsername(session.username || "");
			setPoints(session.points || 0);
			setFriends(session.friends || []);
			setRequests(session.requests || []);
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
				body: formData,
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.message === "User updated successfully") {
						alert("Profile updated successfully!");
						setPoints(data.updatedPoints || points);
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

	function handleSendFriendRequest(e: React.FormEvent) {
		e.preventDefault();
		if (friendCode.length !== 5) {
			alert("Friend code must be exactly 5 characters.");
			return;
		}

		const formData = new FormData();
		formData.append("friendCode", session?.id);

		fetch(`/api/user/${friendCode}`, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.message === "Friend request sent successfully") {
					alert("Friend request sent!");
					setRequests((prev: any) => [...prev, friendCode]);
					setFriendCode(""); // Clear the input field
				} else {
					alert(data.message || "Failed to send friend request.");
				}
			})
			.catch((err) => {
				console.error("Error sending friend request:", err);
				alert("An error occurred while sending the friend request.");
			});
	}

	function handleAcceptRequest(request: string) {
		// Remove the request from the requests array and update the state
		setRequests((prev: any) => prev.filter((req: string) => req !== request));

		// Add the request to the friends array and update the state
		setFriends((prev: any) => [...prev, request]);

		// update the user's friends in the database
		const formData = new FormData();
		formData.append("friend", request);

		fetch(`/api/me`, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.message === "Friend request accepted successfully") {
					alert("Friend request accepted!");
				}
			})
			.catch((err) => {
				console.error("Error accepting friend request:", err);
				alert("An error occurred while accepting the friend request.");
			});
		alert(`Accepted friend request from ${request}`);
	}

	function handleDenyRequest(request: string) {
		// Remove the request from the requests array and update the state
		setRequests((prev: any) => prev.filter((req: string) => req !== request));

		// update the user's requests in the database
		const formData = new FormData();
		formData.append(
			"requests",
			JSON.stringify(requests.filter((req: string) => req !== request))
		);
		fetch(`/api/user/${session?.id}`, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.message === "Friend request denied successfully") {
					alert("Friend request denied!");
				}
			})
			.catch((err) => {
				console.error("Error denying friend request:", err);
				alert("An error occurred while denying the friend request.");
			});

		alert(`Denied friend request from ${request}`);
	}

	return (
		<div className="px-6 py-10 my-10 max-w-full lg:max-w-1/2 mx-auto font-sans text-neutral-100">
			<div className="bg-[color:var(--color-surface-800)]/70 backdrop-blur-md rounded-xl px-6 py-5 my-6 shadow-sm">
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

			{/* Friends, Friend Requests, and Send Friend Request Section */}
			<div className="bg-[color:var(--color-surface-800)] rounded-xl px-6 py-5 my-6 shadow-md">
				<h2 className="text-3xl font-bold tracking-[-.01em] text-[color:var(--color-warning-300)] mb-4">
					Friends & Requests
				</h2>

				{/* Friend Code */}
				<div className="mb-4">
					<p className="text-lg text-neutral-100">
						<strong>Friend Code:</strong> <code>{session?.id}</code>
					</p>
				</div>

				{/* Friends List */}
				<div className="mb-6">
					<h3 className="text-2xl font-semibold text-[color:var(--color-warning-200)] mb-2">
						Friends
					</h3>
					<ul className="list-none space-y-4">
						{friends.length > 0 ? (
							friends.map((friendCode: string, index: number) => (
								<Friend key={index} friendCode={friendCode} />
							))
						) : (
							<p className="text-neutral-400">No friends yet.</p>
						)}
					</ul>
				</div>

				{/* Friend Requests */}
				<div className="mb-6">
					<h3 className="text-2xl font-semibold text-[color:var(--color-warning-200)] mb-2">
						Friend Requests
					</h3>
					<ul className="list-none space-y-4">
						{requests.length > 0 ? (
							requests.map((request: string, index: number) => (
								<FriendRequest
									key={index}
									request={request}
									onAccept={handleAcceptRequest}
									onDeny={handleDenyRequest}
								/>
							))
						) : (
							<p className="text-neutral-400">No friend requests yet.</p>
						)}
					</ul>
				</div>

				{/* Send Friend Request */}
				<div>
					<h3 className="text-2xl font-semibold text-[color:var(--color-warning-200)] mb-2">
						Send Friend Request
					</h3>
					<form onSubmit={handleSendFriendRequest} className="space-y-4">
						<input
							type="text"
							className="w-full p-2 rounded bg-neutral-800 text-white"
							onChange={(e) => setFriendCode(e.target.value)}
							value={friendCode}
							placeholder="Enter friend's code..."
						/>
						<button
							type="submit"
							className="w-full px-4 py-2 bg-success-600 text-white rounded"
						>
							Send Request
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default function ProfilePage() {
	const { isMobile, isSafari } = useDevice();
	if (isMobile && isSafari) return <Mobile />;
	else return <Mobile />;
}
