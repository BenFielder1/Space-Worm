// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

import StarField from '@/components/StarField';

interface Game {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    playUrl: string;
    tags: string[];
}

// Sample game data - replace with your actual games
const games: Game[] = [
    {
        id: '1',
        title: 'Cosmic Runner',
        description: 'Navigate through asteroid fields in this endless runner',
        thumbnail: '/games/cosmic-runner-thumb.jpg',
        playUrl: '/games/cosmic-runner',
        tags: ['Endless Runner', '3D', 'Space']
    },
    {
        id: '2',
        title: 'Worm Holes',
        description: 'Bend space-time to solve mind-bending puzzles',
        thumbnail: '/games/worm-holes-thumb.jpg',
        playUrl: '/games/worm-holes',
        tags: ['Puzzle', 'Physics', '2D']
    },
    {
        id: '3',
        title: 'Space Defender',
        description: 'Protect your space station from alien invasions',
        thumbnail: '/games/space-defender-thumb.jpg',
        playUrl: '/games/space-defender',
        tags: ['Tower Defense', 'Strategy', '3D']
    }
];

export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            {/* Animated background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
                {/* <div className="stars"></div>
                <div className="stars2"></div>
                <div className="stars3"></div> */}
                <StarField />
            </div>

            {/* Header/Navigation */}
            <nav className="relative z-10 px-6 py-4 md:px-12">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center space-x-3">
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
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#games" className="hover:text-lime-400 transition-colors">
                            Games
                        </Link>
                        <Link href="#about" className="hover:text-lime-400 transition-colors">
                            About
                        </Link>
                        <Link href="#contact" className="hover:text-lime-400 transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 px-6 py-20 md:px-12 md:py-32">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="mb-8 inline-block">
                        <div className="relative">
                            {/* <div className="absolute inset-0 blur-3xl bg-lime-400/20 rounded-full"></div> */}
                            <Image
                                src="/space-worm-logo.png"
                                alt="Space Worm Logo"
                                width={400}
                                height={200}
                                className="relative z-10 w-64 h-32 md:w-150 md:h-75 mx-auto"
                            />
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-lime-400 bg-clip-text text-transparent">
                        Explore the Universe of Games
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Welcome to Space Worm - A collection of Unity-powered games crafted with passion and pixels
                    </p>
                    <Link
                        href="#games"
                        className="inline-flex items-center px-8 py-3 bg-lime-400 text-black font-semibold rounded-full hover:bg-lime-300 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-lime-400/25"
                    >
                        Play Now
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* Games Showcase */}
            <section id="games" className="relative z-10 px-6 py-20 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Featured Games
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {games.map((game) => (
                            <div
                                key={game.id}
                                className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-lime-400/50 transition-all duration-300"
                            >
                                {/* Game Thumbnail */}
                                <div className="aspect-video bg-gray-800 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    {/* Replace with actual game thumbnails */}
                                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Game Info */}
                                <div className="p-6">
                                    <h4 className="text-xl font-semibold mb-2 group-hover:text-lime-400 transition-colors">
                                        {game.title}
                                    </h4>
                                    <p className="text-gray-400 mb-4 text-sm">
                                        {game.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {game.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Play Button */}
                                    <Link
                                        href={game.playUrl}
                                        className="inline-flex items-center text-lime-400 hover:text-lime-300 font-semibold group/play"
                                    >
                                        Play Game
                                        <svg className="w-4 h-4 ml-1 transform group-hover/play:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="relative z-10 px-6 py-20 md:px-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-3xl md:text-4xl font-bold mb-8">
                        About Space Worm
                    </h3>
                    <p className="text-lg text-gray-300 mb-6">
                        Space Worm is a creative playground where Unity meets imagination.
                        Each game is a unique experiment in gameplay, visual design, and interactive storytelling.
                    </p>
                    <p className="text-lg text-gray-300">
                        Built with Unity and C#, these games represent a journey through different genres and mechanics,
                        from fast-paced action to mind-bending puzzles. Each project pushes the boundaries of what&apos;s
                        possible in browser-based gaming.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="relative z-10 px-6 py-20 md:px-12 mb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-3xl md:text-4xl font-bold mb-8">
                        Get in Touch
                    </h3>
                    <p className="text-lg text-gray-300 mb-8">
                        Have feedback about the games? Want to collaborate? Let&apos;s connect!
                    </p>
                    <div className="flex justify-center space-x-6">
                        <a
                            href="https://github.com/yourusername"
                            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-lime-400 transition-all"
                            aria-label="GitHub"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a
                            href="https://twitter.com/yourusername"
                            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-lime-400 transition-all"
                            aria-label="Twitter"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                        </a>
                        <a
                            href="mailto:your@email.com"
                            className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-lime-400 transition-all"
                            aria-label="Email"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-gray-800 px-6 py-8 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <Image
                            src="/space-worm-logo.png"
                            alt="Space Worm"
                            width={30}
                            height={30}
                            className="w-8 h-8"
                        />
                        <span className="text-sm text-gray-400">© 2024 Space Worm. All rights reserved.</span>
                    </div>
                    <div className="text-sm text-gray-400">
                        Built with Unity, Next.js, and
                        <span className="text-lime-400"> ♥</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}