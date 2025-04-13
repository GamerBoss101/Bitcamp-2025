"use client";

import { useState } from "react";
import MobileNav from "@/lib/components/MobileNav";
import NavBar from "@/lib/components/NavBar";
import { useDevice } from "@/lib/context/DeviceContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isMobile, isSafari } = useDevice();
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayMusic = () => {
        const audioElement = document.getElementById("background-music") as HTMLAudioElement;
        if (audioElement) {
            audioElement.play();
            setIsPlaying(true);
        }
    };

    return (
        <main
            className="max-h-screen max-w-screen bg-img overflow-hidden"
            suppressHydrationWarning={true}
        >
            {!isMobile && !isSafari ? <NavBar /> : null}
            <section className="space-x-2 gap-4 flex flex-col overflow-y-auto h-screen p-4 lg:p-6 lg:rounded-xl lg:shadow-sm mb-2">
                {children}
            </section>
            {isMobile && isSafari ? (
                <>
                    {/* Background Music */}
                    <audio id="background-music" loop>
                        <source src="/background_music.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>

                    {/* Play Button */}
                    {!isPlaying && (
                        <div className="fixed bottom-16 left-0 right-0 z-50 flex justify-center">
                            <button
                                onClick={handlePlayMusic}
                                className="px-4 py-2 bg-primary-500 text-white rounded-full shadow-md"
                            >
                                Play Music
                            </button>
                        </div>
                    )}

                    {/* Mobile Navigation */}
                    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300">
                        <MobileNav />
                    </div>
                </>
            ) : null}
        </main>
    );
}
