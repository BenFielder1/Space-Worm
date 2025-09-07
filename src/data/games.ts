import Game from "@/types/Game";

export const gamesData: Game[] = [
    {
        id: 'pyramid-numbers',
        title: 'Pyramid Numbers',
        description: 'Merge and add numbers to reach the top of the pyramid.',
        thumbnail: '/games/pyramidnumbers.png',
        playUrl: '/games/pyramid-numbers',
        tags: ['Puzzle', '2D', 'Pyramids'],
        category: 'Puzzle',
        featured: true,
        apkUrl: '/downloads/PyramidNumbers.apk',
        apkSize: '25MB',
        aspect: '9/16',
        width: '100',
        fullscreen: false
    },
    {
        id: 'fps',
        title: 'FPS',
        description: 'Shoot your way through endless waves of zombies. Survive as long as you can!',
        thumbnail: '/games/fps.png',
        playUrl: '/games/fps',
        tags: ['Endless FPS', '3D', 'Zombies'],
        category: 'Action',
        featured: true,
        apkUrl: '/downloads/PyramidNumbers.apk',
        apkSize: '25MB',
        aspect: 'video',
        width: 'full',
        fullscreen: true
    },
    {
        id: 'tile-vania',
        title: 'Tile Vania',
        description: 'Run, jump and fight your way through a to reach the end of each level.',
        thumbnail: '/games/tile-vania.jpg',
        playUrl: '/games/tile-vania',
        tags: ['Platformer', 'Action', '2D'],
        category: 'Platformer',
        featured: true,
        aspect: 'video',
        width: 'full',
        fullscreen: true
    },
    {
        id: 'block-breaker',
        title: 'Block Breaker',
        description: 'Keep the ball in play and break all the blocks to advance to the next level.',
        thumbnail: '/games/tile-vania.jpg',
        playUrl: '/games/block-breaker',
        tags: ['Casual', 'Blocks', '2D'],
        category: 'Casual',
        featured: true,
        aspect: 'video',
        width: 'full',
        fullscreen: true
    }
];