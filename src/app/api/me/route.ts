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


		let bio = formData.get("bio");
		if(bio) {
            userData = await db.users.update(userData.id, { bio: bio.toString() });
            if (!userData) return NextResponse.json({ message: "Failed to update bio" }, { status: 500 });
            return NextResponse.json({ message: "Bio updated successfully" }, { status: 200 });
        }
        
        return NextResponse.json({ message: "No Update" }, { status: 400 });
	} catch (error) {
		console.error("Error updating user bio:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
