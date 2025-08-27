// app/games/[gameId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { notFound, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import UnityGame from '@/components/UnityGame';
// import { isMobileDevice } from '@/utils/deviceDetection';
import { gamesData } from '@/data/games';

const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  // Check for mobile devices
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  
  // Also check for touch support and screen size
  const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;
  
  return mobileRegex.test(userAgent) || (hasTouchScreen && isSmallScreen);
};

export default function GamePage() {
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileOverride, setShowMobileOverride] = useState(false);

    const pathname = usePathname();
    const id = pathname.split("/")[2];
    
    const gameConfig = gamesData.filter(game => game.id === id)[0];
    
    if (!gameConfig) {
        notFound();
    }

    useEffect(() => {
        setIsMobile(isMobileDevice());

        // Also listen for window resize
        const handleResize = () => {
            setIsMobile(isMobileDevice());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <nav className="px-6 py-4 md:px-12 border-b border-gray-800 bg-black/50 backdrop-blur-sm">
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
                        href="/games"
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="hidden sm:inline">Back to Games</span>
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

                    {/* Unity WebGL Container or Mobile Warning */}
                    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl mb-8">
                        {isMobile && !showMobileOverride ? (
                            /* Mobile Device Warning */
                            <div className="aspect-video flex items-center justify-center p-8">
                                <div className="text-center max-w-lg">
                                    <div className="mb-6">
                                        <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto flex items-center justify-center mb-4">
                                            <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-semibold mb-3">Mobile Device Detected</h2>
                                        <p className="text-gray-400 mb-6">
                                            This WebGL game is optimized for desktop browsers and may not run properly on mobile devices.
                                            For the best experience, please download our Android app!
                                        </p>
                                    </div>

                                    {/* Download APK Button */}
                                    {gameConfig.apkUrl ? (
                                        <div className="space-y-4">
                                            <a
                                                href={gameConfig.apkUrl}
                                                download
                                                className="inline-flex items-center px-6 py-3 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition-all transform hover:scale-105"
                                            >
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                    />
                                                </svg>
                                                Download Android App
                                                {gameConfig.apkSize && (
                                                    <span className="ml-2 text-sm opacity-75">({gameConfig.apkSize})</span>
                                                )}
                                            </a>

                                            <div className="text-sm text-gray-500">
                                                <p>Requires Android 5.0 or higher</p>
                                            </div>

                                            {/* Try Anyway Button */}
                                            <button
                                                onClick={() => setShowMobileOverride(true)}
                                                className="text-gray-400 hover:text-white text-sm underline transition-colors"
                                            >
                                                Try WebGL version anyway
                                            </button>
                                        </div>
                                    ) : (
                                        /* No APK Available */
                                        <div className="space-y-4">
                                            <p className="text-yellow-400">
                                                Mobile app coming soon! Please try this game on a desktop computer.
                                            </p>
                                            <Link
                                                href="/games"
                                                className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all"
                                            >
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                                </svg>
                                                Browse Other Games
                                            </Link>

                                            {/* Try Anyway Button */}
                                            <div>
                                                <button
                                                    onClick={() => setShowMobileOverride(true)}
                                                    className="text-gray-400 hover:text-white text-sm underline transition-colors"
                                                >
                                                    Try WebGL version anyway
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            /* Unity WebGL Game */
                            <div className="aspect-video relative">
                                {isMobile && showMobileOverride && (
                                    /* Mobile Performance Warning Banner */
                                    <div className="absolute top-0 left-0 right-0 bg-yellow-900/90 backdrop-blur-sm p-3 z-10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2 text-yellow-200 text-sm">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                    />
                                                </svg>
                                                <span>Performance may be limited on mobile devices</span>
                                            </div>
                                            {gameConfig.apkUrl && (
                                                <a
                                                    href={gameConfig.apkUrl}
                                                    className="text-yellow-200 hover:text-white underline text-sm"
                                                >
                                                    Download App
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <UnityGame
                                    gameFolder={gameConfig.id}
                                    gameName={gameConfig.id}
                                />
                            </div>
                        )}
                    </div>

                    {/* Game Info Tabs - Always visible */}
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

                            {/* System Requirements / Mobile Info */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4 text-lime-400">
                                    {isMobile ? 'Mobile Info' : 'Requirements'}
                                </h2>
                                {isMobile ? (
                                    <ul className="space-y-2 text-gray-300 text-sm">
                                        <li className="flex items-start">
                                            <span className="text-lime-400 mr-2">✓</span>
                                            Android 5.0+ for APK
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-lime-400 mr-2">✓</span>
                                            50MB storage space
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-lime-400 mr-2">✓</span>
                                            2GB RAM minimum
                                        </li>
                                    </ul>
                                ) : (
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
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Download Section - Shows only on mobile */}
                    {isMobile && gameConfig.apkUrl && (
                        <div className="mt-6 bg-gradient-to-br from-lime-900/20 to-lime-800/10 backdrop-blur-sm rounded-xl p-6 border border-lime-400/30">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-lime-400 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Get the Mobile App</h3>
                                        <p className="text-sm text-gray-400">Better performance on Android</p>
                                    </div>
                                </div>
                                <a
                                    href={gameConfig.apkUrl}
                                    download
                                    className="px-6 py-2 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition-all"
                                >
                                    Download APK
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}