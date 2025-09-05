// app/games/[gameId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { notFound, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
import UnityGame from '@/components/UnityGame';
// import { isMobileDevice } from '@/utils/deviceDetection';
import { gamesData } from '@/data/games';
import MobileGameCard from '@/components/MobileGameCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    // const [showMobileOverride, setShowMobileOverride] = useState(false);

    const pathname = usePathname();
    const id = pathname.split("/")[2];
    
    const gameConfig = gamesData.filter(game => game.id === id)[0];
    
    if (!gameConfig) {
        notFound();
    }

    useEffect(() => {
        setIsMobile(isMobileDevice());

        // setIsMobile(true);

        // Also listen for window resize
        const handleResize = () => {
            setIsMobile(isMobileDevice());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            {/* Game Container */}
            <div className="px-6 md:px-12">
                <div className="relative max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                        {gameConfig.title}
                    </h1>
                    
                    {/* {isMobile? (
                        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl mb-8 justify-center flex">

                        </div>
                    ) : (
                        <div></div>
                    )} */}

                    {/* Unity WebGL Container or Mobile Warning */}
                    <div className="rounded-xl overflow-hidden  mb-8 justify-center flex">
                        {isMobile? (
                            <div className="bg-gray-900 shadow-2xl w-full">
                                <MobileGameCard gameTitle={gameConfig.title} apkUrl={gameConfig.apkUrl} apkSize='25 MB' />
                            </div>
                        ) : (
                            /* Unity WebGL Game */
                            <div className={`aspect-${gameConfig.aspect} 
                                                ${gameConfig.width ? `w-${gameConfig.width}` : ""}
                                                ${gameConfig.height ? `h-${gameConfig.height}` : ""} relative`}>
                            {/* <div className={`aspect-9/16 w-100 relative`}> */}
                                <UnityGame
                                    gameFolder={gameConfig.id}
                                    gameName={gameConfig.title}
                                    fullscreen={gameConfig.fullscreen}
                                    // width={"calc((100vh - 200px) * (9/16))"}
                                    // height={"calc((100vh - 200px))"}
                                />
                            </div>
                        )}
                    </div>

                    {/* Game Info Tabs - Always visible */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 mb-8">
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

                    {/* Mobile Download Section */}
                    {!isMobile && gameConfig.apkUrl && (
                        <div className="mt-8 mb-16 bg-gradient-to-br from-lime-900/20 to-lime-800/10 backdrop-blur-sm rounded-xl p-6 border border-lime-400/30">
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
                                        <p className="text-sm text-gray-400">Play the Game on Android</p>
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

            <Footer />
        </div>
    );
}