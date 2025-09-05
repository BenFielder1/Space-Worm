// components/MobileGameCard.tsx
'use client';

import { useState } from 'react';

interface MobileGameCardProps {
    gameTitle: string;
    apkUrl?: string;
    apkSize?: string;
    minAndroidVersion?: string;
    // onTryWebGL: () => void;
}

export default function MobileGameCard({
    gameTitle,
    apkUrl,
    apkSize = 'Unknown size',
    minAndroidVersion = '5.0',
    // onTryWebGL
}: MobileGameCardProps) {
    const [showInstructions, setShowInstructions] = useState(false);

    return (
        <div className="bg-gray-900 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
            <div className="text-center">
                {/* Icon */}
                <div className="w-24 h-24 bg-gray-800 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-12 h-12 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                    </svg>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-3">Play {gameTitle} on Mobile</h2>
                <p className="text-gray-400 mb-8">
                    For the best mobile experience, download our Android app.
                    The WebGL version of this game does not have support for mobile controls.
                </p>

                {apkUrl ? (
                    <>
                        {/* Download Button */}
                        <a
                            href={apkUrl}
                            download
                            className="inline-flex items-center px-8 py-4 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-300 transition-all transform hover:scale-105 mb-6"
                        >
                            {/* <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                />
                            </svg> */}
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            Download Android App
                            <span className="ml-2 text-sm opacity-75">({apkSize})</span>
                        </a>

                        {/* App Requirements */}
                        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                            <h3 className="font-semibold mb-3">Requirements</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                                <div>
                                    <p className="text-gray-400">Android Version</p>
                                    <p className="text-white">{minAndroidVersion} or higher</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">File Size</p>
                                    <p className="text-white">{apkSize}</p>
                                </div>
                            </div>
                        </div>

                        {/* Installation Instructions Toggle */}
                        <button
                            onClick={() => setShowInstructions(!showInstructions)}
                            className="text-lime-400 hover:text-lime-300 text-sm mb-4 transition-colors"
                        >
                            How to install APK files {showInstructions ? '▲' : '▼'}
                        </button>

                        {/* Installation Instructions */}
                        {showInstructions && (
                            <div className="bg-gray-800/30 rounded-lg p-6 text-left mb-6">
                                <h4 className="font-semibold mb-3">Installation Steps:</h4>
                                <ol className="space-y-2 text-sm text-gray-300">
                                    <li>1. Download the APK file above</li>
                                    <li>2. Open your device&apos;s Settings → Security</li>
                                    <li>3. Enable &quot;Unknown Sources&quot; or &quot;Install unknown apps&quot;</li>
                                    <li>4. Open the downloaded APK file</li>
                                    <li>5. Tap &quot;Install&quot; and wait for completion</li>
                                    <li>6. Open the app and enjoy!</li>
                                </ol>
                            </div>
                        )}
                    </>
                ) : (
                    /* No APK Available */
                    <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-6 mb-6">
                        <p className="text-yellow-300 mb-3">
                            📱 Mobile app coming soon!
                        </p>
                        <p className="text-gray-400 text-sm">
                            We&apos;re working on bringing this game to Android.
                            For now, please use a desktop computer to play the WebGL version.
                        </p>
                    </div>
                )}

                {/* Alternative Options */}
                {/* <div className="border-t border-gray-700 pt-6 space-y-3">
                    <button
                        // onClick={onTryWebGL}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                        Try WebGL version anyway →
                    </button>
                    <p className="text-xs text-gray-500">
                        Note: WebGL may not work properly on all mobile devices
                    </p>
                </div> */}
            </div>
        </div>
    );
}