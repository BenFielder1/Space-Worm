import type { Metadata } from "next";
import "./globals.css";
import StarField from "@/components/StarField";

export const metadata: Metadata = {
    title: 'Space Worm - Unity Games Collection',
    description: 'Explore a universe of Unity-powered games. Play cosmic adventures, solve puzzles, and defend the galaxy!',
    keywords: 'unity games, webgl games, space games, indie games, browser games',
    authors: [{ name: 'Ben Fielder' }],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {/* Animated background */}
                <div className="fixed inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
                    <StarField />
                </div>
                {children}
            </body>
        </html>
    );
}
