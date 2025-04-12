
import Footer from "@/lib/components/Footer";

export default function MobileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			{children}
			<Footer />
		</main>
	);
}
