/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef } from 'react';

interface UnityGameProps {
    gameFolder: string;
    gameName: string;
}

declare global {
    interface Window {
        createUnityInstance: any;
    }
}

export default function UnityGame({ gameFolder, gameName }: UnityGameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const unityInstanceRef = useRef<any>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const progressBarFillRef = useRef<HTMLDivElement>(null);
    const loadingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let isCleaningUp = false;

        const loadUnityGame = async () => {
            if (!canvasRef.current) return;

            const buildUrl = `/games/${gameFolder}/Build`;
            const loaderUrl = `${buildUrl}/${gameFolder}.loader.js`;
            const config = {
                dataUrl: `${buildUrl}/${gameFolder}.data`,
                frameworkUrl: `${buildUrl}/${gameFolder}.framework.js`,
                codeUrl: `${buildUrl}/${gameFolder}.wasm`,
                streamingAssetsUrl: "StreamingAssets",
                companyName: "Space Worm",
                productName: gameName,
                productVersion: "1.0",
            };

            const script = document.createElement("script");
            script.src = loaderUrl;
            script.async = true;

            script.onload = () => {
                if (window.createUnityInstance && !isCleaningUp) {
                    window.createUnityInstance(canvasRef.current, config, (progress: number) => {
                        if (progressBarFillRef.current) {
                            progressBarFillRef.current.style.width = `${100 * progress}%`;
                        }
                    }).then((unityInstance: any) => {
                        unityInstanceRef.current = unityInstance;
                        if (loadingRef.current) {
                            loadingRef.current.style.display = 'none';
                        }

                        // Store instance globally for emergency cleanup
                        (window as any).currentUnityInstance = unityInstance;
                    }).catch((message: string) => {
                        console.error(message);
                    });
                }
            };

            document.body.appendChild(script);

            return script;
        };

        const script = loadUnityGame();

        // Cleanup function
        const cleanup = () => {
            isCleaningUp = true;

            // Quit Unity instance
            if (unityInstanceRef.current) {
                try {
                    unityInstanceRef.current.Quit().then(() => {
                        console.log('Unity instance quit successfully');
                        unityInstanceRef.current = null;
                    }).catch((e: any) => {
                        console.error('Error quitting Unity:', e);
                    });
                } catch (e) {
                    console.error('Error during Unity cleanup:', e);
                }
            }

            // Remove global reference
            if ((window as any).currentUnityInstance === unityInstanceRef.current) {
                (window as any).currentUnityInstance = null;
            }

            // Remove script
            script.then(scriptElement => {
                if (scriptElement && scriptElement.parentNode) {
                    scriptElement.parentNode.removeChild(scriptElement);
                }
            });

            // Clear canvas
            if (canvasRef.current) {
                const context = canvasRef.current.getContext('webgl') || canvasRef.current.getContext('webgl2');
                if (context) {
                    context.getExtension('WEBGL_lose_context')?.loseContext();
                }
            }
        };

        // Listen for route changes
        window.addEventListener('beforeunload', cleanup);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && unityInstanceRef.current) {
                // Pause the game when tab is hidden
                unityInstanceRef.current.SendMessage('GameController', 'PauseGame');
            }
        });

        return () => {
            cleanup();
            window.removeEventListener('beforeunload', cleanup);
        };
    }, [gameFolder, gameName]);

    const handleFullscreen = () => {
        if (unityInstanceRef.current) {
            unityInstanceRef.current.SetFullscreen(1);
        }
    };

    return (
        <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
            {/* Loading Screen */}
            <div
                ref={loadingRef}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900"
            >
                <div className="mb-8">
                    <div className="w-16 h-16 border-4 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="text-white text-lg mb-4">Loading {gameName}...</div>
                <div ref={progressBarRef} className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        ref={progressBarFillRef}
                        className="h-full bg-lime-400 transition-all duration-300 ease-out"
                        style={{ width: '0%' }}
                    ></div>
                </div>
            </div>

            <canvas
                ref={canvasRef}
                // style={{ width, height }}
                className="w-full h-full"
                tabIndex={-1}
            />

            <button
                onClick={handleFullscreen}
                className="absolute bottom-4 right-4 p-2 bg-gray-800/80 hover:bg-gray-700 rounded-lg transition-colors"
                aria-label="Fullscreen"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                </svg>
            </button>
        </div>
    );
}