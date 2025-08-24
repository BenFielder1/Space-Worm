// app/games/page.tsx
'use client';

import { useState, useMemo } from 'react';
// import Image from 'next/image';
import Link from 'next/link';
// import StarField from '@/components/StarField';
import AdvancedFilters from '@/components/AdvancedFilters';
// import ViewToggle from '@/components/ViewToggle';
import GameListItem from '@/components/GameListItem';
import SearchSuggestions from '@/components/SearchSuggestions';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

// Sample games data
const gamesData: Game[] = [
    {
        id: '1',
        title: 'Cosmic Runner',
        description: 'Navigate through asteroid fields in this endless runner',
        thumbnail: '/games/cosmic-runner-thumb.jpg',
        playUrl: '/games/cosmic-runner',
        tags: ['Endless Runner', '3D', 'Space'],
        category: 'Action',
        releaseDate: '2024-01-15',
        playCount: 1234,
        rating: 4.5,
        duration: '5-10 min'
    },
    {
        id: '2',
        title: 'Worm Holes',
        description: 'Bend space-time to solve mind-bending puzzles',
        thumbnail: '/games/worm-holes-thumb.jpg',
        playUrl: '/games/worm-holes',
        tags: ['Puzzle', 'Physics', '2D'],
        category: 'Puzzle',
        releaseDate: '2024-02-01',
        playCount: 890,
        rating: 4.8,
        duration: '15-20 min'
    },
    {
        id: '3',
        title: 'Space Defender',
        description: 'Protect your space station from alien invasions',
        thumbnail: '/games/space-defender-thumb.jpg',
        playUrl: '/games/space-defender',
        tags: ['Tower Defense', 'Strategy', '3D'],
        category: 'Strategy',
        releaseDate: '2024-02-15',
        playCount: 2100,
        rating: 4.6,
        duration: '20-30 min'
    },
    {
        id: '4',
        title: 'Asteroid Miner',
        description: 'Mine precious resources from asteroids',
        thumbnail: '/games/asteroid-miner-thumb.jpg',
        playUrl: '/games/asteroid-miner',
        tags: ['Simulation', 'Resource Management', '3D'],
        category: 'Simulation',
        releaseDate: '2024-01-20',
        playCount: 756,
        rating: 4.3,
        duration: '10-15 min'
    },
    {
        id: '5',
        title: 'Gravity Wells',
        description: 'Use gravity to navigate through space mazes',
        thumbnail: '/games/gravity-wells-thumb.jpg',
        playUrl: '/games/gravity-wells',
        tags: ['Puzzle', 'Physics', 'Space'],
        category: 'Puzzle',
        releaseDate: '2024-03-01',
        playCount: 445,
        rating: 4.7,
        duration: '10-15 min'
    },
    {
        id: '6',
        title: 'Star Fighter',
        description: 'Engage in epic space battles',
        thumbnail: '/games/star-fighter-thumb.jpg',
        playUrl: '/games/star-fighter',
        tags: ['Shooter', 'Action', '3D'],
        category: 'Action',
        releaseDate: '2024-02-20',
        playCount: 3200,
        rating: 4.4,
        duration: '5-10 min'
    }
];

// Get unique categories and tags
const categories = ['All', ...new Set(gamesData.map(game => game.category))];
const allTags = [...new Set(gamesData.flatMap(game => game.tags))];

type SortOption = 'newest' | 'popular' | 'rating' | 'name';

export default function GamesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [showFilters, setShowFilters] = useState(false);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [viewMode, ] = useState<'grid' | 'list'>('grid');
    const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
    const [advancedFilters, setAdvancedFilters] = useState<{
        categories: string[];
        tags: string[];
        minRating: number;
        minPlayCount: number;
        duration: string[];
    }>({
        categories: [],
        tags: [],
        minRating: 0,
        minPlayCount: 0,
        duration: []
    });

    // Filter and sort games
    const filteredGames = useMemo(() => {
        let filtered = gamesData;

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(game =>
                game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Category filter
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(game => game.category === selectedCategory);
        }

        // Tags filter
        if (selectedTags.length > 0) {
            filtered = filtered.filter(game =>
                selectedTags.every(tag => game.tags.includes(tag))
            );
        }

        // Advanced filters
        if (advancedFilters.minRating > 0) {
            filtered = filtered.filter(game => game.rating >= advancedFilters.minRating);
        }

        if (advancedFilters.minPlayCount > 0) {
            filtered = filtered.filter(game => game.playCount >= advancedFilters.minPlayCount);
        }

        if (advancedFilters.duration.length > 0) {
            filtered = filtered.filter(game =>
                advancedFilters.duration.includes(game.duration)
            );
        }

        // Sort
        switch (sortBy) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
                break;
            case 'popular':
                filtered.sort((a, b) => b.playCount - a.playCount);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        return filtered;
    }, [searchQuery, selectedCategory, selectedTags, sortBy, advancedFilters]);

    // Get search suggestions
    const searchSuggestions = useMemo(() => {
        if (!searchQuery || searchQuery.length < 2) return [];

        return gamesData
            .filter(game =>
                game.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, 5)
            .map(game => ({
                id: game.id,
                title: game.title,
                category: game.category,
                playUrl: game.playUrl
            }));
    }, [searchQuery]);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handleApplyAdvancedFilters = (filters: typeof advancedFilters) => {
        setAdvancedFilters(filters);
    };

    const activeFilterCount =
        (advancedFilters.minRating > 0 ? 1 : 0) +
        (advancedFilters.minPlayCount > 0 ? 1 : 0) +
        advancedFilters.duration.length +
        selectedTags.length;

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background */}
            {/* <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
                <StarField />
            </div> */}

            {/* Header */}
            {/* <nav className="relative z-10 px-6 py-4 md:px-12 border-b border-gray-800 bg-black/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                        <Image
                            src="/space-worm-logo.png"
                            alt="Space Worm"
                            width={40}
                            height={40}
                            className="w-10 h-10"
                        />
                        <span className="text-xl font-semibold">Space Worm</span>
                    </Link>

                    
                    <ViewToggle view={viewMode} onViewChange={setViewMode} />
                </div>
            </nav> */}

            <Header />

            {/* Main Content */}
            <div className="relative z-10 px-6 py-8 md:px-12 mb-20">
                <div className="max-w-7xl mx-auto">
                    {/* Page Title */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-white to-lime-400 bg-clip-text text-transparent">
                        Explore Our Games
                    </h1>

                    {/* Search and Filters */}
                    <div className="mb-8 space-y-4">
                        {/* Search Bar with ViewToggle */}
                        <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto">
                            {/* Search Bar Container */}
                            <div className="relative flex-1 max-w-2xl">
                                <input
                                    type="text"
                                    placeholder="Search games..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setShowSearchSuggestions(true)}
                                    onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                                    className="w-full px-12 py-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
                                />
                                <svg
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}

                                {/* Search Suggestions */}
                                {showSearchSuggestions && (
                                    <SearchSuggestions
                                        query={searchQuery}
                                        games={searchSuggestions}
                                        onSelect={() => setShowSearchSuggestions(false)}
                                    />
                                )}
                            </div>

                            {/* View Toggle - Now positioned next to search */}
                            {/* <ViewToggle view={viewMode} onViewChange={setViewMode} /> */}
                        </div>

                        {/* Filter Controls */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {/* Category Filter */}
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-400">Category:</span>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                                ? 'bg-lime-400 text-black'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort Dropdown */}
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-400">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="px-4 py-1 bg-gray-800 text-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="popular">Most Popular</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="name">Name (A-Z)</option>
                                </select>
                            </div>

                            {/* Toggle Filters Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center space-x-2 px-4 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 12h10m-7 5h4" />
                                    </svg>
                                    <span>Quick Filters</span>
                                </button>

                                <button
                                    onClick={() => setShowAdvancedFilters(true)}
                                    className="flex items-center space-x-2 px-4 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                    <span>Advanced ({activeFilterCount})</span>
                                </button>
                            </div>
                        </div>

                        {/* Tags Filter (Quick Filters - Collapsible) */}
                        {showFilters && (
                            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 max-w-4xl mx-auto">
                                <h3 className="text-sm font-semibold text-gray-400 mb-3">Filter by Tags:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {allTags.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={`px-3 py-1 rounded-full text-sm transition-all ${selectedTags.includes(tag)
                                                ? 'bg-lime-400 text-black'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                                {selectedTags.length > 0 && (
                                    <button
                                        onClick={() => setSelectedTags([])}
                                        className="mt-3 text-sm text-lime-400 hover:text-lime-300 transition-colors"
                                    >
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Results Count */}
                    <div className="text-center mb-6">
                        <p className="text-gray-400">
                            Showing <span className="text-lime-400 font-semibold">{filteredGames.length}</span> of{' '}
                            <span className="text-white">{gamesData.length}</span> games
                        </p>
                    </div>

                    {/* Games Display - Grid or List View */}
                    {filteredGames.length > 0 ? (
                        viewMode === 'grid' ? (
                            /* Grid View */
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredGames.map((game) => (
                                    <div
                                        key={game.id}
                                        className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-lime-400/50 transition-all duration-300 transform hover:scale-[1.02]"
                                    >
                                        {/* Game Thumbnail */}
                                        <div className="aspect-video bg-gray-800 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                            {/* Placeholder game thumbnail */}
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="text-center">
                                                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <p className="text-xs text-gray-500">{game.duration}</p>
                                                </div>
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
                                ))}
                            </div>
                        ) : (
                            /* List View */
                            <div className="space-y-4">
                                {filteredGames.map((game) => (
                                    <GameListItem key={game.id} game={game} />
                                ))}
                            </div>
                        )
                    ) : (
                        /* No Results */
                        <div className="text-center py-20">
                            <div className="inline-block p-6 bg-gray-900/30 backdrop-blur-sm rounded-full mb-6">
                                <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">No games found</h3>
                            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('All');
                                    setSelectedTags([]);
                                    setAdvancedFilters({
                                        categories: [],
                                        tags: [],
                                        minRating: 0,
                                        minPlayCount: 0,
                                        duration: []
                                    });
                                }}
                                className="px-6 py-3 bg-lime-400 text-black font-semibold rounded-full hover:bg-lime-300 transition-all"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}

                    {/* Load More Button (if you want pagination later) */}
                    {filteredGames.length > 6 && (
                        <div className="text-center mt-12">
                            <button className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition-all">
                                Load More Games
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Advanced Filters Modal */}
            <AdvancedFilters
                isOpen={showAdvancedFilters}
                onClose={() => setShowAdvancedFilters(false)}
                onApply={handleApplyAdvancedFilters}
                currentFilters={advancedFilters}
            />

            {/* Stats Section */}
            {/* <section className="relative z-10 px-6 py-16 md:px-12 border-t border-gray-800 mt-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-lime-400 mb-2">
                                {gamesData.length}
                            </div>
                            <div className="text-gray-400">Total Games</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-lime-400 mb-2">
                                {gamesData.reduce((sum, game) => sum + game.playCount, 0).toLocaleString()}
                            </div>
                            <div className="text-gray-400">Total Plays</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-lime-400 mb-2">
                                {categories.length - 1}
                            </div>
                            <div className="text-gray-400">Categories</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-lime-400 mb-2">
                                {(gamesData.reduce((sum, game) => sum + game.rating, 0) / gamesData.length).toFixed(1)}
                            </div>
                            <div className="text-gray-400">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section> */}

            <Footer />
        </div>
    );
}