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
<<<<<<< HEAD
	const { isMobile, isSafari } = useDevice();
	return (
		<main>
			{!isMobile && !isSafari ? <NavBar /> : null}
			<section className="grid grid-rows-[1fr_auto]">
				<Image
					src="/drinkhappylogo.png"
					alt="Drink Happy Logo Image"
					width={200}
					height={200}
					className="h-auto mx-auto w-1/4"
				/>
				{children}
			</section>
			{isMobile && isSafari ? (
				<div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300">
					<MobileNav />
				</div>
			) : null}
		</main>
	);
=======

    const { isMobile, isSafari } = useDevice();
    return (
        <main className="card grid grid-rows-[1fr_auto]">

            <Image 
                src="/drinkhappylogo.png"
                alt="Drink Happy Logo Image"
                width={500}
                height={500}
                className="h-auto mx-auto w-1/3"
            />
            {children}
            { isMobile && isSafari ? (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300">
                    <MobileNav />
                </div>
            ) : null }
        </main>
    );
>>>>>>> 3361d0451f88d7bbe1a241b09f5cc013c2abf8f7
}
