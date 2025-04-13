"use client";

import { useDevice } from "@/lib/context/DeviceContext";

function Mobile() {
	const { session } = useDevice();
	let isAuthenticated = session == null ? false : true;

	return (
		<main className="flex flex-col gap-[32px] row-start-2 items-center mt-10">
			<h1 className="text-3xl sm:text-4xl font-bold tracking-[-.01em] text-center sm:text-left">
				Welcome, {session?.name || "NULL"} !!
			</h1>

			{isAuthenticated ? (
				<div>
					<button type="button" className="btn bg-surface-500">
						<a href="/auth/logout">Logout</a>
					</button>
				</div>
			) : (
				<div className="flex gap-4">
					<button type="button" className="btn bg-surface-500">
						<a href="/auth/login?screen_hint=signup">Sign up</a>
					</button>
					<button type="button" className="btn bg-surface-500">
						<a href="/auth/login?screen_hint=login">Log in</a>
					</button>
				</div>
			)}
		</main>
	);
}

function Web() {
	const { session } = useDevice();
	let isAuthenticated = session == null ? false : true;

	return (
		<main className="flex flex-col row-start-2 items-center mt-10">
			<h1 className="text-3xl sm:text-4xl font-bold tracking-[-.01em] text-center sm:text-left">
				Welcome, {session?.name || "NULL"} !!
			</h1>

			{isAuthenticated ? (
				<div>
					<button type="button" className="btn bg-surface-500">
						<a href="/auth/logout">Logout</a>
					</button>
				</div>
			) : (
				<div className="flex gap-4">
					<button type="button" className="btn bg-surface-500">
						<a href="/auth/login?screen_hint=signup">Sign up</a>
					</button>
					<button type="button" className="btn bg-surface-500">
						<a href="/auth/login?screen_hint=login">Log in</a>
					</button>
				</div>
			)}
		</main>
	);
}

export default function Home() {
	const { isMobile, isSafari } = useDevice();
	if (isMobile && isSafari) return Mobile();
	else return Web();
}
