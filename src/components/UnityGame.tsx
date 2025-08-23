/* eslint-disable @typescript-eslint/no-explicit-any */
// components/UnityGame.tsx
'use client';

import { useEffect, useRef } from 'react';

interface UnityGameProps {
    gameFolder: string;
    gameName: string;
    width?: number | string;
    height?: number | string;
}

declare global {
    interface Window {
        createUnityInstance: any;
    }
}

export default function UnityGame({ gameFolder, gameName, width = '100%', height = '100%' }: UnityGameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const unityInstanceRef = useRef<any>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const progressBarFillRef = useRef<HTMLDivElement>(null);
    const loadingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadUnityGame = async () => {
            if (!canvasRef.current) return;

            const buildUrl = `/games/${gameFolder}/Build`;
            const loaderUrl = `${buildUrl}/${gameName}.loader.js`;
            const config = {
                dataUrl: `${buildUrl}/${gameName}.data`,
                frameworkUrl: `${buildUrl}/${gameName}.framework.js`,
                codeUrl: `${buildUrl}/${gameName}.wasm`,
                streamingAssetsUrl: "StreamingAssets",
                companyName: "Space Worm",
                productName: gameName,
                productVersion: "1.0",
            };

            // Load Unity loader script
            const script = document.createElement("script");
            script.src = loaderUrl;
            script.async = true;

            script.onload = () => {
                if (window.createUnityInstance) {
                    window.createUnityInstance(canvasRef.current, config, (progress: number) => {
                        // Update progress bar
                        if (progressBarFillRef.current) {
                            progressBarFillRef.current.style.width = `${100 * progress}%`;
                        }
                    }).then((unityInstance: any) => {
                        unityInstanceRef.current = unityInstance;
                        // Hide loading screen
                        if (loadingRef.current) {
                            loadingRef.current.style.display = 'none';
                        }
                    }).catch((message: string) => {
                        alert(message);
                    });
                }
            };

            document.body.appendChild(script);

            // Cleanup function
            return () => {
                if (unityInstanceRef.current) {
                    unityInstanceRef.current.Quit().then(() => {
                        unityInstanceRef.current = null;
                    });
                }
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            };
        };

        loadUnityGame();
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
                {/* Progress Bar */}
                <div ref={progressBarRef} className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        ref={progressBarFillRef}
                        className="h-full bg-lime-400 transition-all duration-300 ease-out"
                        style={{ width: '0%' }}
                    ></div>
                </div>
            </div>

            {/* Unity Canvas */}
            <canvas
                ref={canvasRef}
                style={{ width, height }}
                className="w-full h-full"
                tabIndex={-1}
            />

            {/* Fullscreen Button */}
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