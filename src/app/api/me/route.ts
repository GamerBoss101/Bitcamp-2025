import { NextResponse } from "next/server";
import { auth0 } from "@/lib/scripts/auth0";
import { db } from "@/lib/scripts/db";

export async function POST(req: Request) {
	try {
		const session = await auth0.getSession();
		if (!session) return NextResponse.json({ message: "No session found" }, { status: 401 });

		const sessionUser = session.user;
		let userData = await db.users.findByEmail(sessionUser.email as string);
		if (!userData) return NextResponse.json({ message: "User not found" }, { status: 404 });

		const formData = await req.formData();
		if (!formData) return NextResponse.json({ message: "No form data found" }, { status: 400 });

		let bio = formData.get("bio");
		if(bio) {
            userData = await db.users.update(userData.id, { bio: bio });
            if (!userData) return NextResponse.json({ message: "Failed to update bio" }, { status: 500 });
        }

		let avatar = formData.get("avatar");
		if(avatar) {
			userData = await db.users.update(userData.id, { avatar: parseInt(avatar.toString()) });
			if (!userData) return NextResponse.json({ message: "Failed to update avatar" }, { status: 500 });
		}

		let username = formData.get("username");
		if(username) {
			userData = await db.users.update(userData.id, { username: username });
			if (!userData) return NextResponse.json({ message: "Failed to update username" }, { status: 500 });
		}

		let points = formData.get("points");
		if(points) {
			userData = await db.users.update(userData.id, { points: parseInt(points.toString()) });
			if (!userData) return NextResponse.json({ message: "Failed to update points" }, { status: 500 });
		}

		let inventory = formData.get("inventory");
		if(inventory) {
			let inventoryData = userData.inventory;
			if (!inventoryData) inventoryData = [];
			inventoryData.push(parseInt(inventory.toString()));

			userData = await db.users.update(userData.id, { inventory: inventoryData });
			if (!userData) return NextResponse.json({ message: "Failed to update inventory" }, { status: 500 });
		}

		let friend = formData.get("friend");
		if(friend) {
			let friendsData = userData.friends;
			if (!friendsData) friendsData = [];
			friendsData.push(friend.toString());

			// Remove the friend from the requests array
			let requestsData = userData.requests;
			if (requestsData) {
				requestsData = requestsData.filter((req: string) => req !== friend);
				userData = await db.users.update(userData.id, { requests: requestsData });
				if (!userData) return NextResponse.json({ message: "Failed to update requests" }, { status: 500 });
			}

			userData = await db.users.update(userData.id, { friends: friendsData });
			if (!userData) return NextResponse.json({ message: "Failed to update friends" }, { status: 500 });
		}

		let requests = formData.get("requests");
		if(requests) {
			userData = await db.users.update(userData.id, { requests: JSON.parse(requests.toString()) });
			if (!userData) return NextResponse.json({ message: "Failed to update requests" }, { status: 500 });
		}
        
        return NextResponse.json({ message: "User updated successfully", user: userData }, { status: 200 });
	} catch (error) {
		console.error("Error updating user bio:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
