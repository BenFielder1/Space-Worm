// app/games/[gameId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { notFound, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image';
// import UnityGame from '@/components/UnityGame';
import UnityGameUniversal from '@/components/UnityGameUniversal';
// import { isMobileDevice } from '@/utils/deviceDetection';
import { gamesData } from '@/data/games';
import MobileGameCard from '@/components/MobileGameCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GameInfoTab from '@/components/GameInfoTab';
import { gamesInfoData } from '@/data/gamesInfo';

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
    const gameInfo = gamesInfoData.filter(game => game.id === id)[0];
    
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
                                <UnityGameUniversal
                                    gameFolder={gameConfig.id}
                                    gameName={gameConfig.title}
                                    // fullscreen={gameConfig.fullscreen}
                                    // width={"calc((100vh - 200px) * (9/16))"}
                                    // height={"calc((100vh - 200px))"}
                                />
                            </div>
                        )}
                    </div>

                    {/* Game Info Tabs - Always visible */}
                    <GameInfoTab gameInfo={gameInfo} />

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