import { NextResponse } from "next/server";
import { auth0 } from "../../../lib/scripts/auth0";

import { db } from "@/lib/scripts/db";

export async function GET() {
	try {
		const session = await auth0.getSession();

		if (!session) {
			return NextResponse.json({ session: null }, { status: 200 });
		}

		const sessionUser = session.user;
		let userData = await db.users.findByEmail((sessionUser.email as string));

		if (!userData) {
			console.log("User not found in database, creating new user...");
			userData = await db.users.create(sessionUser?.email as string, sessionUser?.nickname as string);
		}

		return NextResponse.json({ session: userData });
	} catch (error) {
		console.error("Error getting session:", error);
		return NextResponse.json({ session: null }, { status: 500 });
	}
}
