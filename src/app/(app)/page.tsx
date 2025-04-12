"use client";

import { useDevice } from "@/lib/context/DeviceContext";

function Mobile() {

	const { session } = useDevice();

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<img src="./drinkhappylogo.png" alt="Drink Happy Logo" className="row-start-1 h-10 sm:h-12 object-contain"/>
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<h1 className="text-3xl sm:text-4xl font-bold tracking-[-.01em] text-center sm:text-left">
					Welcome, {session?.name || "NULL"} !!
				</h1>

				<button>
					<a href="/auth/login?screen_hint=signup">
						Sign up
					</a>
				</button>
				<button>
					<a href="/auth/login?screen_hint=login">
						Log in
					</a>
				</button>
			</main>
		</div>
	);
}

function Web() {

	const {session } = useDevice();
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<h1 className="text-3xl sm:text-4xl font-bold tracking-[-.01em] text-center sm:text-left">
					Welcome, {session?.name || "NULL"} !!
				</h1>

				<button>
					<a href="/auth/login?screen_hint=signup">
						Sign up
					</a>
				</button>
				<button>
					<a href="/auth/login?screen_hint=login">
						Log in
					</a>
				</button>
			</main>
		</div>
	);
}

export default function Home() {

	const { isMobile, isSafari } = useDevice();
	if (isMobile && isSafari) return Mobile();
	else return Web();
}
