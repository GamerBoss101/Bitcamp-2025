import { NextResponse } from "next/server";
import { auth0 } from "@/lib/scripts/auth0";
import { db } from "@/lib/scripts/db";

import { gemini } from "@/lib/scripts/gemini";

async function authenticateUser() {
	const session = await auth0.getSession();

	if (!session) {
		return NextResponse.json({ message: "No session found" }, { status: 401 });
	}

	const sessionUser = session.user;
	let userData = await db.users.findByEmail(sessionUser.email as string);
	if (!userData)
		return NextResponse.json({ message: "User not found" }, { status: 404 });

	return userData;
}

export async function POST(req: Request) {
	try {

		let userData = await authenticateUser();
		if (!userData) return NextResponse.json({ message: "User not found" }, { status: 404 });

		const formData = await req.formData();
		const file = formData.get("image");

		if (!file || !(file instanceof Blob)) {
			return NextResponse.json(
				{ message: "No image file provided" },
				{ status: 400 }
			);
		}

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const prompt = `Generate a 1-3 sentence description for this image.`;

		const data = await gemini.generateDescription(prompt, buffer);
		let postData = await db.posts.create(userData.id, data?.description, buffer);

		if (!postData) {
			return NextResponse.json(
				{ message: "Failed to create post" },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ message: "Image uploaded successfully", postData },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error handling image upload:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
