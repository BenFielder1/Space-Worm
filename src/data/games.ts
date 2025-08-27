import Game from "@/types/Game";

// export const games: Game[] = [
//     {
//         id: "",
//         title: "",
//         description: "",
//         thumbnail: "",
//         playUrl: "",
//         tags: [],
//         category: "",
//         releaseDate: "",
//         playCount: 0,
//         rating: 0,
//         duration: ""
//     },
// ]

export const gamesData: Game[] = [
    {
        id: 'cosmic-runner',
        title: 'Cosmic Runner',
        description: 'Navigate through asteroid fields in this endless runner',
        thumbnail: '/games/snake.png',
        playUrl: '/games/cosmic-runner',
        tags: ['Endless Runner', '3D', 'Space'],
        category: 'Action',
        releaseDate: '2024-01-15',
        playCount: 1234,
        rating: 4.5,
        duration: '5-10 min',
        featured: true,
        apkUrl: '/downloads/cosmic-runner.apk',
        apkSize: '25MB'
    },
    {
        id: 'worm-holes',
        title: 'Worm Holes',
        description: 'Bend space-time to solve mind-bending puzzles',
        thumbnail: '/games/worm-holes-thumb.jpg',
        playUrl: '/games/worm-holes',
        tags: ['Puzzle', 'Physics', '2D'],
        category: 'Puzzle',
        releaseDate: '2024-02-01',
        playCount: 890,
        rating: 4.8,
        duration: '15-20 min',
        featured: true
    },
    {
        id: 'space-defender',
        title: 'Space Defender',
        description: 'Protect your space station from alien invasions',
        thumbnail: '/games/space-defender-thumb.jpg',
        playUrl: '/games/space-defender',
        tags: ['Tower Defense', 'Strategy', '3D'],
        category: 'Strategy',
        releaseDate: '2024-02-15',
        playCount: 2100,
        rating: 4.6,
        duration: '20-30 min',
        featured: true
    },
    {
        id: 'asteroid-miner',
        title: 'Asteroid Miner',
        description: 'Mine precious resources from asteroids',
        thumbnail: '/games/asteroid-miner-thumb.jpg',
        playUrl: '/games/asteroid-miner',
        tags: ['Simulation', 'Resource Management', '3D'],
        category: 'Simulation',
        releaseDate: '2024-01-20',
        playCount: 756,
        rating: 4.3,
        duration: '10-15 min',
        featured: false
    },
    {
        id: 'gravity-wells',
        title: 'Gravity Wells',
        description: 'Use gravity to navigate through space mazes',
        thumbnail: '/games/gravity-wells-thumb.jpg',
        playUrl: '/games/gravity-wells',
        tags: ['Puzzle', 'Physics', 'Space'],
        category: 'Puzzle',
        releaseDate: '2024-03-01',
        playCount: 445,
        rating: 4.7,
        duration: '10-15 min',
        featured: false
    },
    {
        id: 'star-fighter',
        title: 'Star Fighter',
        description: 'Engage in epic space battles',
        thumbnail: '/games/star-fighter-thumb.jpg',
        playUrl: '/games/star-fighter',
        tags: ['Shooter', 'Action', '3D'],
        category: 'Action',
        releaseDate: '2024-02-20',
        playCount: 3200,
        rating: 4.4,
        duration: '5-10 min',
        featured: false
    }
];