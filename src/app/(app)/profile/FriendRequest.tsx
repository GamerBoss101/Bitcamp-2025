"use client";

import { useState, useEffect } from "react";

interface FriendRequestProps {
    request: string;
    onAccept: (request: string) => void;
    onDeny: (request: string) => void;
}

export default function FriendRequest({ request, onAccept, onDeny }: FriendRequestProps) {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the username based on the friend code
        fetch(`/api/user/${request}`)
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
    }, [request]);
    

    return (
        <li className="flex justify-between items-center bg-neutral-800 p-3 rounded">
            <span className="text-neutral-200">
                {username ? `${username} (${request})` : "Loading..."}
            </span>
            <div className="flex gap-2">
                <button
                    className="px-3 py-1 bg-success-600 text-white rounded hover:bg-success-700"
                    onClick={() => onAccept(request)}
                >
                    Accept
                </button>
                <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => onDeny(request)}
                >
                    Deny
                </button>
            </div>
        </li>
    );
}