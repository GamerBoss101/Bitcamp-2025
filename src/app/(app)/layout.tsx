"use client";

import MobileNav from "@/lib/components/MobileNav";
import NavBar from "@/lib/components/NavBar";
import { useDevice } from "@/lib/context/DeviceContext";

import Image from "next/image";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isMobile, isSafari } = useDevice();
	return (
		<main className="max-h-screen max-w-screen bg-img overflow-hidden" suppressHydrationWarning={true}>
			{!isMobile && !isSafari ? <NavBar /> : null}
			<section className="space-x-2 gap-4 flex flex-col overflow-y-auto h-screen p-4 lg:p-6 lg:rounded-xl lg:shadow-sm">
				<img src="/drinkhappylogo.png" alt="Drink Happy Logo Image" className="h-auto mx-auto w-3/4 lg:w-1/4" />
				{children}
			</section>
			{isMobile && isSafari ? (
				<div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300">
					<MobileNav />
				</div>
			) : null}
		</main>
	);
}
