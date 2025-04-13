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
        
        return NextResponse.json({ message: "User updated successfully", user: userData }, { status: 200 });
	} catch (error) {
		console.error("Error updating user bio:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
