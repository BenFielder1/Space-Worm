"use client";
// app/games/[gameId]/page.tsx
import { notFound } from 'next/navigation';
import { usePathname } from "next/navigation";
import UnityGame from '@/components/UnityGame';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { gamesData } from '@/data/games';

export default function GamePage() {
    const pathname = usePathname();
    const id = pathname.split("/")[2];

    const gameConfig = gamesData.filter(game => game.id === id)[0];

    if (!gameConfig) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            <h1 className="relative text-3xl md:text-4xl font-bold mb-2 text-center items-center z-10">
                        {gameConfig.title}
                    </h1>

            {/* Game Container */}
            <div className="px-6 py-8 md:px-12 mb-20">
                <div className="max-w-6xl mx-auto">
                    {/* <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
                        {gameConfig.title}
                    </h1>
                    <p className="text-gray-400 text-center mb-8">{gameConfig.description}</p> */}

                    {/* Unity WebGL Container */}
                    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl mb-8 content-center">
                        <div className={`aspect-${9}/${16} w-90 h-180 content-center justify-center`}>
                            <UnityGame
                                gameFolder={gameConfig.id}
                                gameName={gameConfig.id}
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

            <Footer />
        </div>
    );
}