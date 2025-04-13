"use client";

import { useDevice } from "@/lib/context/DeviceContext";

function Mobile() {
	const { isAuthenticated, session } = useDevice();

	return (
		<main className="flex flex-col gap-[32px] row-start-2 items-center mt-10 text-white">
			<img
				src="/drinkhappylogo.png"
				alt="Drink Happy Logo Image"
				className="h-auto mx-auto my-auto w-3/4 lg:w-1/3"
			/>
			<h1 className="text-3xl sm:text-4xl font-bold tracking-[-.01em] text-center sm:text-left">
				{isAuthenticated ? `Welcome, ${session.username} !!` : ""}
			</h1>
			{!isAuthenticated ? (
				<div className="flex gap-4">
					<button type="button" className="btn bg-surface-500">
						<a href="/auth/login?screen_hint=signup">Sign up</a>
					</button>
					<button type="button" className="btn bg-surface-500">
						<a href="/auth/login?screen_hint=login">Log in</a>
					</button>
				</div>
			) : null}
		</main>
	);
}

function Web() {
	const { isAuthenticated, session } = useDevice();

	return (
		<main className="flex flex-col row-start-2 items-center mt-10">
			<img
				src="/drinkhappylogo.png"
				alt="Drink Happy Logo Image"
				className="h-auto mx-auto w-3/4 lg:w-1/3"
			/>
			<h1 className="text-3xl sm:text-4xl font-bold tracking-[-.01em] text-center sm:text-left text-white">
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
