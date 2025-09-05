'use client';

import { useState, useMemo } from 'react';
import AdvancedFilters from '@/components/AdvancedFilters';
import SearchSuggestions from '@/components/SearchSuggestions';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GameItem from '@/components/GameItem';
import { gamesData } from '@/data/games';


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
        <>
            <div className="min-h-screen bg-black text-white">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredGames.map((game) => (
                                    <GameItem key={game.id} game={game} />
                                ))}
                            </div>
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

            </div>
            <Footer />
        </>
    );
}