// components/UnityGameUniversal.tsx
'use client';

import { useEffect, useState } from 'react';
import UnityGame from './UnityGame';
import UnityGame2018 from './UnityGame2018';
import { detectUnityVersion } from '@/utils/unityVersionDetection';

interface UnityGameUniversalProps {
    gameFolder: string;
    gameName: string;
    width?: number | string;
    height?: number | string;
}

export default function UnityGameUniversal({
    gameFolder,
    gameName
}: UnityGameUniversalProps) {
    const [unityVersion, setUnityVersion] = useState<'modern' | '2018' | 'unknown' | 'loading'>('loading');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkVersion = async () => {
            try {
                const buildInfo = await detectUnityVersion(gameFolder);
                setUnityVersion(buildInfo.version);

                if (buildInfo.version === 'unknown') {
                    setError('Unable to detect Unity version or find game files');
                }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError('Error loading game');
                setUnityVersion('unknown');
            }
        };

        checkVersion();
    }, [gameFolder]);

    if (unityVersion === 'loading') {
        return (
            <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-400">Detecting Unity version...</p>
                </div>
            </div>
        );
    }

    if (error || unityVersion === 'unknown') {
        return (
            <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-red-400">Game Load Error</h3>
                    <p className="text-gray-400 mb-4">{error || 'Unable to load game files'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Render the appropriate Unity component based on version
    if (unityVersion === '2018') {
        return (
            <UnityGame2018
                gameFolder={gameFolder}
                gameName={gameName}
            />
        );
    }

    // Default to modern Unity loader
    return (
        <UnityGame
            gameFolder={gameFolder}
            gameName={gameName}
        />
    );
}