import { Inter } from "next/font/google";
import "../globals.css";
import type { Metadata } from "next";
import SideBar from "../components/dashboard/sidebar";
import { RootProvider, TokenProvider } from "../provider";

export const metadata: Metadata = {
	title: "Dashboard",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} overflow-y-hidden w-full`}>
				<TokenProvider>
					<RootProvider>
						<div className="flex w-full">
							<SideBar />
							{children}
						</div>
					</RootProvider>
				</TokenProvider>
			</body>
		</html>
	);
}
