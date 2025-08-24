"use client"

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    return (
        <nav className="relative z-10 px-6 py-4 md:px-12">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center space-x-3">
                    <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                    <Image
                        src="/space-worm-logo.png"
                        alt="Space Worm"
                        width={120}
                        height={60}
                        className="w-24 h-12 md:w-32 md:h-16"
                    />
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                        Space Worm
                    </h1>
                    </Link>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className={`hover:text-lime-400 transition-colors ${pathname === "/" ? "text-lime-400" : ""}`}>
                        Home
                    </Link>
                    <Link href="/games" className={`hover:text-lime-400 transition-colors ${pathname === "/games" ? "text-lime-400" : ""}`}>
                        Games
                    </Link>
                    <Link href="/about" className={`hover:text-lime-400 transition-colors ${pathname === "/about" ? "text-lime-400" : ""}`}>
                        About
                    </Link>
                    <Link href="/contact" className={`hover:text-lime-400 transition-colors ${pathname === "/contact" ? "text-lime-400" : ""}`}>
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
}   