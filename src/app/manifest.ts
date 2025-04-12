import type { MetadataRoute } from "next";



export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Healthify",
		short_name: "Healthify",
		description:
			"Healthy APP",
		start_url: "/",
		display: "standalone",
		background_color: "#000000",
		theme_color: "#000000",
		icons: [
			{
				src: "/vercel.svg",
				sizes: "192x192",
				type: "image/svg",
			},
		],
	};
}
