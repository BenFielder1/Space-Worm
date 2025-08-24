// components/SearchSuggestions.tsx
'use client';

import Link from 'next/link';

interface SearchSuggestionsProps {
    query: string;
    games: Array<{
        id: string;
        title: string;
        category: string;
        playUrl: string;
    }>;
    onSelect: () => void;
}

export default function SearchSuggestions({ query, games, onSelect }: SearchSuggestionsProps) {
    if (!query || games.length === 0) return null;

    return (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-20">
            <div className="p-2 text-xs text-gray-400 border-b border-gray-800">
                Found {games.length} game{games.length !== 1 ? 's' : ''}
            </div>
            <div className="max-h-64 overflow-y-auto">
                {games.map((game) => (
                    <Link
                        key={game.id}
                        href={game.playUrl}
                        onClick={onSelect}
                        className="block px-4 py-3 hover:bg-gray-800 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-white">{game.title}</div>
                                <div className="text-sm text-gray-400">{game.category}</div>
                            </div>
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}