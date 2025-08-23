import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
