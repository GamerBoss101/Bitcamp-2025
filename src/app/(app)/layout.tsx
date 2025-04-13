"use client";

import { useEffect, useState } from "react";
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

    const handleToggleMusic = () => {
        const audioElement = document.getElementById("background-music") as HTMLAudioElement;
        if (audioElement) {
            if (isPlaying) {
                audioElement.pause();
                setIsPlaying(false);
            } else {
                audioElement.play();
                setIsPlaying(true);
            }
        }
    };

    // Activate music when anything is clicked
    useEffect(() => {
        const handlePageClick = () => {
            const audioElement = document.getElementById("background-music") as HTMLAudioElement;
            if (audioElement && !isPlaying) {
                audioElement.play();
                setIsPlaying(true);
            }
        };

        document.addEventListener("click", handlePageClick);

        return () => {
            document.removeEventListener("click", handlePageClick);
        };
    }, [isPlaying]);

    return (
        <main
            className="max-h-screen max-w-screen bg-img overflow-hidden"
            suppressHydrationWarning={true}
        >
            {/* Navigation Bar */}
            {!isMobile && !isSafari ? <NavBar /> : null}

            {/* Content Section */}
            <section className="space-x-2 gap-4 flex flex-col overflow-y-auto h-screen p-4 lg:p-6 lg:rounded-xl lg:shadow-sm mb-2">
                {children}
            </section>

            {/* Mobile-Specific Features */}
            {isMobile && isSafari ? (
                <>
                    {/* Background Music */}
                    <audio id="background-music" loop>
                        <source src="/background_music.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>

                    {/* Music Toggle Button */}
                    <div className="fixed top-4 left-4 z-50">
                        <button
                            onClick={handleToggleMusic}
                            className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-md"
                            aria-label="Toggle Music"
                        >
                            {isPlaying ? "🔊" : "🔇"}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300">
                        <MobileNav />
                    </div>
                </>
            ) : null}
        </main>
    );
}
