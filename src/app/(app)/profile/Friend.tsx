"use client";

import { useState, useEffect } from "react";

interface FriendProps {
    friendCode: string;
}

export default function Friend({ friendCode }: FriendProps) {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the username based on the friend code
        fetch(`/api/user/${friendCode}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.user) {
                    setUsername(data.user.username);
                } else {
                    setUsername("Unknown User");
                }
            })
            .catch((err) => {
                console.error("Error fetching username:", err);
                setUsername("Unknown User");
            });
    }, [friendCode]);

    return (
        <li className="flex justify-between items-center bg-neutral-800 p-3 rounded">
            <span className="text-neutral-200">
                {username ? `${username} (${friendCode})` : "Loading..."}
            </span>
        </li>
    );
}