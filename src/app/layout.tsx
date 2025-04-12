"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { useEffect, useState } from "react";
import * as rdd from "react-device-detect";
import { useRouter } from "next/navigation";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();

	const [isSafari, setIsSafari] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		setIsSafari(rdd.isSafari);
		setIsMobile(rdd.isMobile);

		console.log("isMobile", isMobile);
		console.log("isSafari", isSafari);
	}, []);

    useEffect(() => {
        if (isMobile && isSafari) {
            router.push("/mobile");
        }
    }, [isMobile, isSafari, router]);

	return (
		<html data-theme="rose" lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning={true}
			>
				{children}
			</body>
		</html>
	);
}
