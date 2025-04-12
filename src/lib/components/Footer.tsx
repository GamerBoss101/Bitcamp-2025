"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
	const router = useRouter();

	return (
		<div className="flex justify-around items-center py-10 bg-gray-100 border-t border-gray-300">
			<button
				onClick={() => router.push("/")}
				className="text-blue-500 text-lg hover:underline"
			>
				Home
			</button>
			<button
				onClick={() => router.push("/explore")}
				className="text-blue-500 text-lg hover:underline"
			>
				Explore
			</button>
			<button
				onClick={() => router.push("/profile")}
				className="text-blue-500 text-lg hover:underline"
			>
				Profile
			</button>
		</div>
	);
};

export default Footer;
