import { NextResponse } from "next/server";
import { auth0 } from "../../../../../lib/scripts/auth0";
import { db } from "@/lib/scripts/db";

async function authenticateUser() {
    const session = await auth0.getSession();

    if (!session) {
        return NextResponse.json({ message: "No session found" }, { status: 401 });
    }

    const sessionUser = session.user;
    let userData = await db.users.findByEmail(sessionUser.email as string);
    if (!userData) return NextResponse.json({ message: "User not found" }, { status: 404 });

    return userData != null;
}

export async function GET(req: Request, { params }: any) {
    try {
        if (!(await authenticateUser())) return;

        const { id } = params;

        // Find the user by ID
        const user = await db.users.findById(id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Fetch all posts for the user
        const posts = await db.posts.getAllByUserId(id);
        if (!posts || posts.length === 0) {
            return NextResponse.json({ message: "No posts found for this user" }, { status: 404 });
        }

        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user posts:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}