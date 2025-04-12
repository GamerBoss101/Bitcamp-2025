"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../lib/css/globals.css";

import { DeviceProvider, useDevice } from "@/lib/context/DeviceContext";
import MobileNav from "@/lib/components/MobileNav";

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
    return (
        <html data-theme="drinky" lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                suppressHydrationWarning={true}
            >
                <DeviceProvider>
                    {children}

                    
                </DeviceProvider>
            </body>
        </html>
    );
}
