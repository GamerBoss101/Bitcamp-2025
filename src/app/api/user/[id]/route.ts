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

        const { id } = params;

        const user = await db.users.findById(id);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Error finding user by ID:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// for making friend requests
export async function POST(req: Request, { params }: any) {
    try {
        if (!(await authenticateUser())) return;

        const { id } = params;

        let user = await db.users.findById(id);

        let formData = await req.formData();
        if (!formData) return NextResponse.json({ message: "No form data found" }, { status: 400 });

        let friendCode = formData.get("friendCode");

        if (!friendCode) return NextResponse.json({ message: "No friend code found" }, { status: 400 });
        let friendCodeString = friendCode.toString();
        if (friendCodeString.length !== 5) return NextResponse.json({ message: "Invalid friend code" }, { status: 400 });
        
        let requests = user.requests || [];

        if (requests.includes(friendCodeString)) {
            return NextResponse.json({ message: "Already sent a friend request" }, { status: 400 });
        }

        requests.push(friendCodeString);
        user = await db.users.update(user.id, { requests });
        if (!user) return NextResponse.json({ message: "Failed to update requests" }, { status: 500 });
        return NextResponse.json({ message: "Friend request sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error sending friend request:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

}