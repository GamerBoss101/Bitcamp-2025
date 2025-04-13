"use client";

import { useDevice } from "@/lib/context/DeviceContext";

function Mobile() {
	const { isAuthenticated, session } = useDevice();

	return (
		<main className="flex flex-col gap-[32px] row-start-2 items-center mt-10">
			<h1 className="text-3xl sm:text-4xl font-bold tracking-[-.01em] text-center sm:text-left">
			 	{isAuthenticated ? `Welcome, ${session.username} !!` : ""}
			</h1>
		</main>
	);
}

function Web() {
	const { isAuthenticated, session } = useDevice();

	return (
		<main className="flex flex-col row-start-2 items-center mt-10">
			<h1 className="text-3xl sm:text-4xl font-bold tracking-[-.01em] text-center sm:text-left">
				{isAuthenticated ? `Welcome, ${session.username} !!` : ""}
			</h1>
		</main>
	);
}

export default function Home() {
	const { isMobile, isSafari } = useDevice();
	if (isMobile && isSafari) return Mobile();
	else return Web();
}
