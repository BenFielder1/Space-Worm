"use client";
// app/games/[gameId]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import UnityGame from '@/components/UnityGame';



// Game configuration - in a real app, this would come from a database
const gameConfigs: Record<string, { title: string; folder: string; description: string }> = {
    'cosmic-runner': {
        title: 'Cosmic Runner',
        folder: 'CosmicRunner',
        description: 'Navigate through asteroid fields in this endless runner'
    },
    'worm-holes': {
        title: 'Worm Holes',
        folder: 'WormHoles',
        description: 'Bend space-time to solve mind-bending puzzles'
    },
    'space-defender': {
        title: 'Space Defender',
        folder: 'SpaceDefender',
        description: 'Protect your space station from alien invasions'
    }
};

export default function GamePage() {
    const pathname = usePathname();
    const gameConfig = gameConfigs[pathname.split("/")[2]]

    if (!gameConfig) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <nav className="px-6 py-4 md:px-12 border-b border-gray-800">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                        <Image
                            src="/space-worm-logo.png"
                            alt="Space Worm"
                            width={40}
                            height={40}
                            className="w-10 h-10"
                        />
                        <span className="text-xl font-semibold">Space Worm</span>
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to Games</span>
                    </Link>
                </div>
            </nav>

            {/* Game Container */}
            <div className="px-6 py-8 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
                        {gameConfig.title}
                    </h1>
                    <p className="text-gray-400 text-center mb-8">{gameConfig.description}</p>

                    {/* Unity WebGL Container */}
                    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl mb-8">
                        <div className="aspect-video">
                            <UnityGame
                                gameFolder={gameConfig.folder}
                                gameName={gameConfig.folder}
                            />
                        </div>
                    </div>

                    {/* Game Info Tabs */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Controls */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-lime-400">Controls</h2>
                                <div className="space-y-2 text-gray-300">
                                    <div className="flex items-center space-x-3">
                                        <kbd className="px-2 py-1 bg-gray-800 rounded text-sm">WASD</kbd>
                                        <span className="text-sm">Move</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <kbd className="px-2 py-1 bg-gray-800 rounded text-sm">Space</kbd>
                                        <span className="text-sm">Jump/Action</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <kbd className="px-2 py-1 bg-gray-800 rounded text-sm">Mouse</kbd>
                                        <span className="text-sm">Look/Aim</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <kbd className="px-2 py-1 bg-gray-800 rounded text-sm">ESC</kbd>
                                        <span className="text-sm">Pause Menu</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tips */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-lime-400">Tips</h2>
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    <li className="flex items-start">
                                        <span className="text-lime-400 mr-2">•</span>
                                        Collect power-ups to boost your score
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-lime-400 mr-2">•</span>
                                        Watch out for obstacles and enemies
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-lime-400 mr-2">•</span>
                                        Complete challenges for bonus points
                                    </li>
                                </ul>
                            </div>

                            {/* System Requirements */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-lime-400">Requirements</h2>
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    <li className="flex items-start">
                                        <span className="text-lime-400 mr-2">✓</span>
                                        Modern web browser
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-lime-400 mr-2">✓</span>
                                        WebGL 2.0 support
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-lime-400 mr-2">✓</span>
                                        4GB RAM recommended
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}