/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/UnityGame2018.tsx (Fixed cleanup)
'use client';

import { useEffect, useRef, useState } from 'react';

interface UnityGame2018Props {
    gameFolder: string;
    gameName: string;
}

declare global {
    interface Window {
        UnityLoader: any;
        gameInstance: any;
        // Unity 2018 specific
        Module: any;
        unityFramework: any;
    }
}

export default function UnityGame2018({ gameFolder, gameName }: UnityGame2018Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const gameInstanceRef = useRef<any>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        let gameContainer: HTMLDivElement | null = null;
        let audioNodes: any[] = [];

        const loadUnityGame = async () => {
            try {
                const buildUrl = `/games/${gameFolder}/Build`;
                const loaderUrl = `${buildUrl}/UnityLoader.js`;
                const configUrl = `${buildUrl}/${gameFolder}.json`;

                const gameContainer = document.createElement('div');
                gameContainer.id = `gameContainer-${Date.now()}`;

                if (containerRef.current) {
                    containerRef.current.appendChild(gameContainer);
                }

                const script = document.createElement('script');
                script.src = loaderUrl;
                script.async = true;

                await new Promise((resolve, reject) => {
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                });

                // Wait for UnityLoader
                let attempts = 0;
                while (!window.UnityLoader && attempts < 10) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    attempts++;
                }

                if (!window.UnityLoader || !isMounted) return;

                // Track audio nodes created
                const originalCreateGain = window.AudioContext?.prototype.createGain;
                const originalCreateSource = window.AudioContext?.prototype.createBufferSource;

                if (window.AudioContext) {
                    window.AudioContext.prototype.createGain = function () {
                        const node = originalCreateGain?.apply(this, arguments as any);
                        if (node) audioNodes.push(node);
                        return node;
                    };

                    window.AudioContext.prototype.createBufferSource = function () {
                        const node = originalCreateSource?.apply(this, arguments as any);
                        if (node) audioNodes.push(node);
                        return node;
                    };
                }

                gameInstanceRef.current = window.UnityLoader.instantiate(
                    gameContainer,
                    configUrl,
                    {
                        onProgress: function (gameInstance: any, progress: number) {
                            if (isMounted) {
                                setLoadProgress(progress);
                                if (progress === 1) {
                                    console.log('Unity 2018 game loaded');
                                    setTimeout(() => {
                                        if (isMounted) {
                                            setIsLoading(false);
                                            // Store canvas reference
                                            canvasRef.current = gameContainer?.querySelector('canvas') || null;
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

                window.gameInstance = gameInstanceRef.current;

            } catch (err) {
                console.error('Unity loading error:', err);
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Failed to load Unity game');
                    setIsLoading(false);
                }
            }
        };

        loadUnityGame();

        // Comprehensive cleanup function
        const cleanup = () => {
            console.log('Starting Unity 2018 cleanup...');
            isMounted = false;

            try {
                // 1. Stop all audio nodes
                audioNodes.forEach(node => {
                    try {
                        if (node.disconnect) node.disconnect();
                        if (node.stop) node.stop(0);
                    } catch (e) { console.error('Audio node cleanup error:', e); }
                });
                audioNodes = [];

                // 2. Close all audio contexts
                if (typeof window !== 'undefined') {
                    // Get all possible audio contexts
                    ['AudioContext', 'webkitAudioContext'].forEach(ctxName => {
                        try {
                            const contexts = (window as any)[`__${ctxName}__`] || [];
                            contexts.forEach((ctx: AudioContext) => {
                                if (ctx.state !== 'closed') {
                                    ctx.close();
                                }
                            });
                        } catch (e) { console.error('AudioContext cleanup error:', e); }
                    });

                    // Try to access Unity's audio context
                    if (gameInstanceRef.current?.Module?.SDL2?.audioContext) {
                        try {
                            gameInstanceRef.current.Module.SDL2.audioContext.close();
                        } catch (e) { console.error('Unity audioContext cleanup error:', e); }
                    }
                }

                // 3. Stop Unity Module execution
                if (window.Module) {
                    try {
                        // Stop the main loop
                        if (window.Module.pauseMainLoop) {
                            window.Module.pauseMainLoop();
                        }
                        if (window.Module.setStatus) {
                            window.Module.setStatus('');
                        }
                        // Clear runtime
                        if (window.Module.onRuntimeInitialized) {
                            window.Module.onRuntimeInitialized = () => { };
                        }
                        // Abort execution
                        if (window.Module.abort) {
                            window.Module.abort();
                        }
                    } catch (e) {
                        console.error('Module cleanup error:', e);
                    }
                }

                // 4. Destroy WebGL context
                if (canvasRef.current) {
                    try {
                        const gl = canvasRef.current.getContext('webgl') ||
                            canvasRef.current.getContext('webgl2') ||
                            canvasRef.current.getContext('experimental-webgl');

                        if (gl) {
                            // Clear all WebGL resources
                            if ('bindBuffer' in gl) {
                                gl.bindBuffer(gl.ARRAY_BUFFER, null);
                                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                                gl.bindRenderbuffer(gl.RENDERBUFFER, null);
                                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                            }
                        }

                        // Remove canvas
                        canvasRef.current.width = 1;
                        canvasRef.current.height = 1;
                        canvasRef.current.remove();
                        canvasRef.current = null;
                    } catch (e) {
                        console.error('Canvas cleanup error:', e);
                    }
                }

                // 5. Clean up game instance
                if (gameInstanceRef.current) {
                    try {
                        // Try Unity-specific cleanup methods
                        if (gameInstanceRef.current.Quit) {
                            gameInstanceRef.current.Quit();
                        }
                        if (gameInstanceRef.current.Delete) {
                            gameInstanceRef.current.Delete();
                        }
                        // Clear Module reference
                        if (gameInstanceRef.current.Module) {
                            gameInstanceRef.current.Module = null;
                        }
                    } catch (e) { console.error('Game instance cleanup error:', e); }
                    gameInstanceRef.current = null;
                }

                // 6. Remove global references
                if (window.gameInstance) {
                    window.gameInstance = null;
                }
                if (window.Module) {
                    window.Module = null;
                }
                if (window.unityFramework) {
                    window.unityFramework = null;
                }

                // 7. Clear the container
                if (gameContainer) {
                    // Remove all event listeners
                    const newContainer = gameContainer.cloneNode(false) as HTMLDivElement;
                    gameContainer.parentNode?.replaceChild(newContainer, gameContainer);
                    gameContainer = null;
                }

                if (containerRef.current) {
                    containerRef.current.innerHTML = '';
                }

                // 8. Force garbage collection hint
                if ((window as any).gc) {
                    (window as any).gc();
                }

            } catch (e) {
                console.error('Cleanup error:', e);
            }

            console.log('Unity 2018 cleanup completed');
        };

        // Handle tab visibility
        const handleVisibilityChange = () => {
            if (document.hidden) {
                try {
                    // Mute Unity audio
                    if (gameInstanceRef.current?.Module?.SDL2) {
                        gameInstanceRef.current.Module.SDL2.audio?.pause();
                    }
                    // Pause all audio contexts
                    if (gameInstanceRef.current?.Module?.SDL2?.audioContext) {
                        gameInstanceRef.current.Module.SDL2.audioContext.suspend();
                    }
                } catch (e) { console.error('Visibility change error:', e);}
            }
        };

        window.addEventListener('beforeunload', cleanup);
        window.addEventListener('pagehide', cleanup);
        window.addEventListener('unload', cleanup);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            cleanup();
            window.removeEventListener('beforeunload', cleanup);
            window.removeEventListener('pagehide', cleanup);
            window.removeEventListener('unload', cleanup);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [gameFolder, gameName]);

    const handleFullscreen = () => {
        const canvas = containerRef.current?.querySelector('canvas');
        if (canvas?.requestFullscreen) {
            canvas.requestFullscreen();
        }
    };

    return (
        <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
            <div ref={containerRef} className="w-full h-full" />

            {/* Loading and error states remain the same */}
            {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900">
                    <div className="mb-8">
                        <div className="w-16 h-16 border-4 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <div className="text-white text-lg mb-4">Loading {gameName}...</div>
                    <div className="text-gray-400 text-sm mb-4">Unity 2018 Build</div>

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