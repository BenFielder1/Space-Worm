// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

// import StarField from '@/components/StarField';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Code2, Grid3x3, Palette, Smartphone } from 'lucide-react';

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
            {/* <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
                <StarField />
            </div> */}

            {/* Header/Navigation */}
            <Header />

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
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-lime-400 bg-clip-text text-transparent">
                        Explore the Universe of Games
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
                        Welcome to Space Worm - A collection of Unity-powered games
                    </p>
                    <div className="mb-8 flex justify-center space-x-8 text-white">
                        <div className="flex items-center space-x-2">
                            <Grid3x3 className="w-5 h-5 text-lime-300" />
                            <span>Unity</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Code2 className="w-5 h-5 text-lime-300" />
                            <span>C#</span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/games"
                        className="inline-flex items-center px-8 py-3 bg-lime-400 text-black font-semibold rounded-full hover:bg-lime-300 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-lime-400/25"
                    >
                        Play Now
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                    <Link
                        href="#games"
                        className="inline-flex items-center px-8 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition-all transform hover:scale-105 border border-gray-700"
                    >
                        Browse Featured
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                    </Link>
                    </div>
                </div>
            </section>

            {/* Games Showcase */}
            <section id="games" className="relative z-10 px-6 py-20 md:px-12 mb-16">
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
            <section id="about" className="py-20 relative mb-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                About <span className="text-lime-400">Space Worm</span>
                            </h2>
                            <p className="text-gray-300 mb-6 text-lg">
                                This is a collection of games from a variety of genres, including 2D platformers, first-person shooters, and puzzle games.
                            </p>
                            <p className="text-gray-300 mb-8 text-lg">
                                Each game is built using Unity and C# to target multiple platforms, including WebGL for browser play and Android for mobile devices.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <div className="text-3xl font-bold text-red-400">{games.length}</div>
                                    <div className="text-gray-400">Games</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-yellow-400">1</div>
                                    <div className="text-gray-400">Engine</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-blue-400">Endless</div>
                                    <div className="text-gray-400">Fun</div>
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack Visual */}
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-red-900/30 to-red-900/10 p-6 rounded-xl border border-red-500/20">
                                    <Grid3x3 className="w-12 h-12 text-red-400 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Unity</h3>
                                    <p className="text-gray-400 text-sm">Game Engine Powering 3D and 2D Graphics</p>
                                </div>
                                <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-900/10 p-6 rounded-xl border border-yellow-500/20">
                                    <Code2 className="w-12 h-12 text-yellow-400 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">C#</h3>
                                    <p className="text-gray-400 text-sm">Object-Oriented Development</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-900/30 to-green-900/10 p-6 rounded-xl border border-green-500/20">
                                    <Palette className="w-12 h-12 text-green-400 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">WebGL</h3>
                                    <p className="text-gray-400 text-sm">Platform for Web Games</p>
                                </div>
                                <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 p-6 rounded-xl border border-blue-500/20">
                                    <Smartphone className="w-12 h-12 text-blue-400 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Mobile</h3>
                                    <p className="text-gray-400 text-sm">Play the Games on Android Devices</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}