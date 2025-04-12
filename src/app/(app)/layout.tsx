"use client";

import MobileNav from "@/lib/components/MobileNav";
import { useDevice } from "@/lib/context/DeviceContext";

import Image from "next/image";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { isMobile, isSafari } = useDevice();
    return (
        <main>

            <Image 
                src="/drinkhappylogo.png"
                alt="Hero Image"
                width={200}
                height={200}
                className="mx-auto w-1/2"
            />
            {children}
            { isMobile && isSafari ? (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300">
                    <MobileNav />
                </div>
            ) : null }
        </main>
    );
}
