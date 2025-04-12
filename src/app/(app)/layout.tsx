"use client";

import MobileNav from "@/lib/components/MobileNav";
import { useDevice } from "@/lib/context/DeviceContext";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { isMobile, isSafari } = useDevice();
    return (
        <main>
            {children}

            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300">
                    <MobileNav />
                </div>
            { isMobile && isSafari ? (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300">
                    <MobileNav />
                </div>
            ) : null }
        </main>
    );
}
