// components/GameListItem.tsx
import Link from 'next/link';

interface Game {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    playUrl: string;
    tags: string[];
    category: string;
    releaseDate: string;
    playCount: number;
    rating: number;
    duration: string;
}

interface GameListItemProps {
    game: Game;
}

export default function GameListItem({ game }: GameListItemProps) {
    return (
        <div className="group bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-lime-400/50 transition-all duration-300">
            <div className="flex flex-col md:flex-row">
                {/* Thumbnail */}
                <div className="md:w-64 aspect-video md:aspect-auto bg-gray-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-semibold group-hover:text-lime-400 transition-colors">
                                    {game.title}
                                </h3>
                                <span className="md:hidden bg-lime-400/90 px-2 py-1 rounded-full text-xs text-black font-semibold">
                                    {game.category}
                                </span>
                            </div>

                            <p className="text-gray-400 mb-3">
                                {game.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {game.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center space-x-1">
                                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span>{game.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>{game.playCount.toLocaleString()} plays</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{game.duration}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Column */}
                        <div className="flex flex-row md:flex-col items-center gap-3">
                            <span className="hidden md:block bg-lime-400/90 px-3 py-1 rounded-full text-xs text-black font-semibold">
                                {game.category}
                            </span>
                            <Link
                                href={game.playUrl}
                                className="flex-1 md:flex-initial px-6 py-2 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition-all group/play"
                            >
                                Play Now
                                <svg className="inline-block w-4 h-4 ml-2 transform group-hover/play:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}