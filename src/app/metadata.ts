import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Drink Happy - Health Check & Game",
    description: "Drink Happy is a fun and engaging app to track your drink choices, earn points, and improve your health!",
    keywords: ["Drink Happy", "Health", "Game", "Drink Tracker", "Healthy Lifestyle"],
    themeColor: "#1E293B", // Matches the app's dark theme
    appleWebApp: {
        title: "Drink Happy",
        statusBarStyle: "black-translucent",
        capable: true,
    },
    manifest: "/manifest.json",
    openGraph: {
        title: "Drink Happy - Health Check & Game",
        description: "Drink Happy is a fun and engaging app to track your drink choices, earn points, and improve your health!",
        siteName: "Drink Happy",
        images: [
            {
                url: "/cappylogosmall.png",
                width: 512,
                height: 512,
                alt: "Drink Happy Logo",
            },
        ],
    },
};