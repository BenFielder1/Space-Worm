// utils/unityVersionDetection.ts
export interface UnityBuildInfo {
    version: 'modern' | '2018' | 'unknown';
    hasJson: boolean;
    hasLoader: boolean;
    files: string[];
}

export async function detectUnityVersion(gameFolder: string): Promise<UnityBuildInfo> {
    const buildPath = `/games/${gameFolder}/Build`;

    try {
        // Check for Unity 2018 specific files
        const unity2018Check = await fetch(`${buildPath}/${gameFolder}.json`, { method: 'HEAD' });
        const hasJson = unity2018Check.ok;

        const loaderCheck = await fetch(`${buildPath}/UnityLoader.js`, { method: 'HEAD' });
        const hasUnityLoader = loaderCheck.ok;

        // Modern Unity uses .loader.js files
        const modernLoaderCheck = await fetch(`${buildPath}/${gameFolder}.loader.js`, { method: 'HEAD' });
        const hasModernLoader = modernLoaderCheck.ok;

        if (hasJson && hasUnityLoader) {
            return {
                version: '2018',
                hasJson: true,
                hasLoader: true,
                files: ['UnityLoader.js', `${gameFolder}.json`]
            };
        } else if (hasModernLoader) {
            return {
                version: 'modern',
                hasJson: false,
                hasLoader: true,
                files: [`${gameFolder}.loader.js`]
            };
        }

        return {
            version: 'unknown',
            hasJson: false,
            hasLoader: false,
            files: []
        };
    } catch (error) {
        console.error('Error detecting Unity version:', error);
        return {
            version: 'unknown',
            hasJson: false,
            hasLoader: false,
            files: []
        };
    }
}