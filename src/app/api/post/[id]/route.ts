import { NextResponse } from "next/server";
import { auth0 } from "../../../../lib/scripts/auth0";
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

        const { id } = await params;

        const post = await db.posts.getById(id);

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ post }, { status: 200 });
    } catch (error) {
        console.error("Error finding post by ID:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
