/* eslint-disable @typescript-eslint/no-explicit-any */
// components/UnityGame2018.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

interface UnityGame2018Props {
    gameFolder: string;
    gameName: string;
    width?: number | string;
    height?: number | string;
}

declare global {
    interface Window {
        UnityLoader: any;
        gameInstance: any;
    }
}

export default function UnityGame2018({
    gameFolder,
    gameName,
    // width = '100%',
    // height = '100%'
}: UnityGame2018Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let gameInstance: any = null;
        let isMounted = true;

        const loadUnityGame = async () => {
            try {
                const buildUrl = `/games/${gameFolder}/Build`;
                const loaderUrl = `${buildUrl}/UnityLoader.js`;
                const configUrl = `${buildUrl}/${gameFolder}.json`;

                // Create container div for Unity
                const gameContainer = document.createElement('div');
                gameContainer.id = `gameContainer-${Date.now()}`;
                // gameContainer.style.width = '100%';
                // gameContainer.style.height = '100%';

                if (containerRef.current) {
                    containerRef.current.appendChild(gameContainer);
                }

                // Load UnityLoader.js
                const script = document.createElement('script');
                script.src = loaderUrl;
                script.async = true;

                await new Promise((resolve, reject) => {
                    script.onload = resolve;
                    script.onerror = () => reject(new Error('Failed to load Unity Loader'));
                    document.body.appendChild(script);
                });

                // Wait a bit for UnityLoader to be available
                let attempts = 0;
                while (!window.UnityLoader && attempts < 10) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    attempts++;
                }

                if (!window.UnityLoader) {
                    throw new Error('UnityLoader not found after loading script');
                }

                // Create Unity instance
                if (isMounted) {
                    gameInstance = window.UnityLoader.instantiate(
                        gameContainer,
                        configUrl,
                        {
                            onProgress: function (gameInstance: any, progress: number) {
                                if (isMounted) {
                                    setLoadProgress(progress);
                                    if (progress === 1) {
                                        setTimeout(() => {
                                            if (isMounted) {
                                                setIsLoading(false);
                                            }
                                        }, 100);
                                    }
                                }
                            },
                            Module: {
                                onRuntimeInitialized: function () {
                                    console.log('Unity 2018 runtime initialized');
                                },
                                // Unity 2018 specific settings
                                TOTAL_MEMORY: 268435456, // 256MB
                                TOTAL_STACK: 5242880,    // 5MB
                                errorhandler: null,
                                compatibilitycheck: null,
                                backgroundColor: "#231F20",
                                splashStyle: "Dark"
                            }
                        }
                    );

                    // Store instance globally for fullscreen
                    window.gameInstance = gameInstance;
                }

            } catch (err) {
                console.error('Unity loading error:', err);
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to load Unity game');
                    setIsLoading(false);
                }
            }
        };

        loadUnityGame();

        // Cleanup
        return () => {
            isMounted = false;

            // Clean up Unity instance
            if (gameInstance) {
                try {
                    // Unity 2018 doesn't have Quit method, but we can try to clean up
                    if (gameInstance.Module && gameInstance.Module.canvas) {
                        gameInstance.Module.canvas.remove();
                    }
                } catch (e) {
                    console.error('Cleanup error:', e);
                }
            }

            // Remove global reference
            if (window.gameInstance === gameInstance) {
                window.gameInstance = null;
            }

            // Clean up container
            if (containerRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                containerRef.current.innerHTML = '';
            }
        };
    }, [gameFolder, gameName]);

    const handleFullscreen = () => {
        if (window.gameInstance && window.gameInstance.SetFullscreen) {
            window.gameInstance.SetFullscreen(1);
        } else {
            // Fallback to canvas fullscreen
            const canvas = containerRef.current?.querySelector('canvas');
            if (canvas && canvas.requestFullscreen) {
                canvas.requestFullscreen();
            }
        }
    };

    return (
        <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
            {/* Game Container */}
            <div
                ref={containerRef}
                // className="w-full h-full"
                // style={{ width, height }}
                tabIndex={-1}
            >
                {/* Unity will inject its canvas here */}
            </div>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900">
                    <div className="mb-8">
                        <div className="w-16 h-16 border-4 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <div className="text-white text-lg mb-4">Loading {gameName}...</div>
                    <div className="text-gray-400 text-sm mb-4">Unity 2018 Build</div>

                    {/* Progress Bar */}
                    <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-lime-400 transition-all duration-300 ease-out"
                            style={{ width: `${loadProgress * 100}%` }}
                        ></div>
                    </div>
                    <div className="text-gray-400 text-sm mt-2">
                        {Math.round(loadProgress * 100)}%
                    </div>
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900">
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-red-400">Loading Error</h3>
                        <p className="text-gray-400 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            )}

            {/* Fullscreen Button - Only show when loaded */}
            {!isLoading && !error && (
                <button
                    onClick={handleFullscreen}
                    className="absolute bottom-4 right-4 p-2 bg-gray-800/80 hover:bg-gray-700 rounded-lg transition-colors z-20"
                    aria-label="Fullscreen"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                    </svg>
                </button>
            )}

            {/* Unity 2018 Badge */}
            {!isLoading && !error && (
                <div className="absolute top-4 right-4 text-xs text-gray-500 bg-gray-900/80 px-2 py-1 rounded z-20">
                    Unity 2018
                </div>
            )}
        </div>
    );
}