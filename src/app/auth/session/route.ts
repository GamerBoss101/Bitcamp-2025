import { NextResponse } from "next/server";
import { auth0 } from "../../../lib/scripts/auth0";

export async function GET() {
	try {
		const session = await auth0.getSession();
		return NextResponse.json({ session: session?.user });
	} catch (error) {
		console.error("Error getting session:", error);
		return NextResponse.json({ session: null }, { status: 500 });
	}
}
