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


export async function POST(req: Request, { params }: any) {
    try {
        if (!(await authenticateUser())) return;

        const { id } = await params;

        const post = await db.posts.getById(id);

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        const formData = await req.formData();

        let like = formData.get("like");
        if(like) {
            await db.posts.addReaction(id, {
                liked: true,
                warned: false,
            });

            return NextResponse.json({ message: "Post liked successfully" }, { status: 200 });
        }

        let warn = formData.get("warn");
        if(warn) {
            await db.posts.addReaction(id, {
                liked: false,
                warned: true,
            });

            return NextResponse.json({ message: "Post warned successfully" }, { status: 200 });
        }
        return NextResponse.json({ message: "No action taken" }, { status: 400 });

    } catch (error) {
        console.error("Error finding post by ID:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: any) {
    try {
        if (!(await authenticateUser())) return;

        const { id } = await params;

        const post = await db.posts.getById(id);

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        await db.posts.delete(id);

        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}