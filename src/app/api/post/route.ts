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

/*
Points Guide
Learn how many points you receive for each drink!

Game Points System:
+150 points for drinking ≥100 oz of water
+100 points for keeping caffeine < 200 mg
+150 points for staying under the sugar cap all day
Exceeding 400mg caffeine limit or 30.5g sugar limit = 0 pts logged for those drinks
Beverage Scoring System
Drink	Volume (oz)	Caffeine (mg)	Sugar (g)	Points Earned	Bonus
Water	8	n/a	n/a	100	+15 for >=64oz in day
Coffee	8	95	?	50	0 pts after 400mg caffeine
Tea	8	55	?	50	0 pts after 400mg caffeine
Coca-Cola	8	34	39	0	Exceeds sugar
100% Fruit Juice	8	0	22	50	0 pts after 30.5g sugar
Dairy Milk (low-fat)	8	0	12	50	+0.5 calcium bonus
*/ 

function calculatePoints(description: string): number {
    let points = 0;

    // Normalize the description to lowercase for easier matching
    const normalizedDescription = description.toLowerCase();

    // Points calculation based on the description
    if (normalizedDescription.includes("water")) {
        points += 100; // Base points for water
        if (normalizedDescription.includes("≥64oz") || normalizedDescription.includes("64oz or more")) {
            points += 15; // Bonus for drinking ≥64oz of water
        }
    } else if (normalizedDescription.includes("coffee")) {
        points += 50; // Base points for coffee
        if (normalizedDescription.includes("≥400mg caffeine") || normalizedDescription.includes("exceeds caffeine")) {
            points = 0; // No points if caffeine exceeds 400mg
        }
    } else if (normalizedDescription.includes("tea")) {
        points += 50; // Base points for tea
        if (normalizedDescription.includes("≥400mg caffeine") || normalizedDescription.includes("exceeds caffeine")) {
            points = 0; // No points if caffeine exceeds 400mg
        }
    } else if (normalizedDescription.includes("coca-cola")) {
        points = 0; // No points for Coca-Cola due to sugar
    } else if (normalizedDescription.includes("fruit juice")) {
        points += 50; // Base points for fruit juice
        if (normalizedDescription.includes("≥30.5g sugar") || normalizedDescription.includes("exceeds sugar")) {
            points = 0; // No points if sugar exceeds 30.5g
        }
    } else if (normalizedDescription.includes("milk")) {
        points += 50; // Base points for milk
        if (normalizedDescription.includes("low-fat")) {
            points += 0.5; // Bonus for low-fat milk
        }
    }

    return points;
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
        const points = calculatePoints(data?.description || ""); // Calculate points based on the description

        let postData = await db.posts.create(
            userData.id,
            data?.description,
            buffer.toString("base64")
        );

		await db.users.update(userData.id, { points: userData.points + points });

        if (!postData) {
            return NextResponse.json(
                { message: "Failed to create post" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Image uploaded successfully", postData, points },
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

export async function GET(req: Request) {
	try {
		let userData = await authenticateUser();
		if (!userData) return NextResponse.json({ message: "User not found" }, { status: 404 });

		const posts = await db.posts.getAllByUserId(userData.id);

		if (!posts) {
			return NextResponse.json(
				{ message: "Failed to fetch posts" },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ message: "Posts fetched successfully", posts },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching posts:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}