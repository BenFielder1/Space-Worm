import Image from 'next/image';
import Link from 'next/link';

import Game from '@/types/Game';

interface GameItemProps {
    game: Game;
}

export default function GameItem({ game }: GameItemProps) {
    return (
        <div
            key={game.id}
            className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-lime-400/50 transition-all duration-300 transform hover:scale-[1.02]"
        >
            {/* Game Thumbnail */}
            <div className="aspect-video bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Placeholder game thumbnail */}
                <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                        src={game.thumbnail}
                        alt={game.title}
                        width={4000}
                        height={2500}
                        className="w-full h-full object-cover"
                    />
                    {/* <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <svg className="w-16 h-16 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs text-gray-500">{game.duration}</p>
                        </div>
                    </div> */}
                </div>

                {/* Play Count Badge */}
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                    <svg className="w-3 h-3 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-white">{game.playCount.toLocaleString()}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2 bg-lime-400/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-xs text-black font-semibold">{game.category}</span>
                </div>
            </div>

            {/* Game Info */}
            <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold group-hover:text-lime-400 transition-colors">
                        {game.title}
                    </h4>
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-300">{game.rating}</span>
                    </div>
                </div>

                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {game.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {game.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 bg-gray-800 rounded-full text-xs text-gray-300"
                        >
                            {tag}
                        </span>
                    ))}
                    {game.tags.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-800 rounded-full text-xs text-gray-400">
                            +{game.tags.length - 3}
                        </span>
                    )}
                </div>

                {/* Play Button */}
                <Link
                    href={game.playUrl}
                    className="flex items-center justify-center w-full px-4 py-2 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition-all group/play"
                >
                    Play Now
                    <svg className="w-4 h-4 ml-2 transform group-hover/play:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}