import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Drink Happy",
        short_name: "Drink Happy",
        description: "Track your drinks, earn points, and improve your health with Drink Happy!",
        start_url: "/",
        display: "standalone",
        background_color: "#1E293B", // Matches the app's dark theme
        theme_color: "#1E293B", // Matches the app's dark theme
        icons: [
            {
                src: "/cappylogosmall.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/cappylogosmall.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
