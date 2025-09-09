// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Code2, Grid3x3 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GameItem from '@/components/GameItem';
import { gamesData } from '@/data/games';


export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <Header />

            {/* Hero Section */}
            <section className="relative z-10 px-6 py-20 md:px-12 md:py-20">
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
                    <div className="max-w-2xl mx-auto mt-8 mb-8 bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 backdrop-blur-sm rounded-xl p-2 border border-yellow-400/30">
                        <div className="flex items-center justify-center space-x-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="yellow" className='w-8 h-8'>
                                <path d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.8 536.6 69.6 524.5C62.4 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 416C302.3 416 288 430.3 288 448C288 465.7 302.3 480 320 480C337.7 480 352 465.7 352 448C352 430.3 337.7 416 320 416zM320 224C301.8 224 287.3 239.5 288.6 257.7L296 361.7C296.9 374.2 307.4 384 319.9 384C332.5 384 342.9 374.3 343.8 361.7L351.2 257.7C352.5 239.5 338.1 224 319.8 224z" />
                            </svg>
                            <div>
                                <h3 className="font-semibold">Most games are currently in prototype stages and may not behave as expected.</h3>
                            </div>
                        </div>
                    </div>
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
                        {gamesData.filter(game => game.featured === true).map((game) => (
                            <GameItem key={game.id} game={game} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}