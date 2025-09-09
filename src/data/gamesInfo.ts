import GameInfo from "@/types/GameInfo";

export const gamesInfoData: GameInfo[] = [
    {
        id: 'pyramid-numbers',
        controls: [
            { key: 'Click', description: 'Set tile number' },
            { key: 'Drag + Drop', description: 'Merge tiles' },
            { key: 'Click + Hold', description: 'Delete tile' },
        ],
        tips: [
            // 'Collect power-ups to boost your score',
            // 'Watch out for obstacles and enemies',
            // 'Complete challenges for bonus points',
        ], 
        requirements: [
            'Modern web browser',
            'WebGL 2.0 support',
            '4GB RAM recommended',
        ],
    },
    {
        id: 'zompocalypse',
        controls: [
            { key: 'Arrow Keys', description: 'Move player' },
            { key: 'AD', description: 'Look around' },
            { key: 'SPACE', description: 'Shoot' },
        ],
        tips: [
            // 'Collect power-ups to boost your score',
            // 'Watch out for obstacles and enemies',
            // 'Complete challenges for bonus points',
        ], 
        requirements: [
            'Modern web browser',
            'WebGL 2.0 support',
            '4GB RAM recommended',
        ],
    },
    {
        id: 'tile-adventure',
        controls: [
            { key: 'AD', description: 'Move left / right' },
            { key: 'WS', description: 'Move up / down ladder' },
            { key: 'i', description: 'Jump' },
            { key: 'o', description: 'Attack' },
            { key: 'p', description: 'Open / use door' },
        ],
        tips: [
            // 'Collect power-ups to boost your score',
            // 'Watch out for obstacles and enemies',
            // 'Complete challenges for bonus points',
        ], 
        requirements: [
            'Modern web browser',
            'WebGL 2.0 support',
            '4GB RAM recommended',
        ],
    },
    {
        id: 'block-breaker',
        controls: [
            { key: 'Mouse Move', description: 'Move bat' },
        ],
        tips: [
            // 'Collect power-ups to boost your score',
            // 'Watch out for obstacles and enemies',
            // 'Complete challenges for bonus points',
        ], 
        requirements: [
            'Modern web browser',
            'WebGL 2.0 support',
            '4GB RAM recommended',
        ],
    },
    {
        id: 'space-defender',
        controls: [
            { key: 'Arrow Keys', description: 'Move ship' },
            { key: 'SPACE', description: 'Shoot' },
        ],
        tips: [
            // 'Collect power-ups to boost your score',
            // 'Watch out for obstacles and enemies',
            // 'Complete challenges for bonus points',
        ], 
        requirements: [
            'Modern web browser',
            'WebGL 2.0 support',
            '4GB RAM recommended',
        ],
    },
]