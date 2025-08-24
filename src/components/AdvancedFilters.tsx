// components/AdvancedFilters.tsx
'use client';

import { useState } from 'react';

interface AdvancedFiltersProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: FilterOptions) => void;
    currentFilters: FilterOptions;
}

interface FilterOptions {
    categories: string[];
    tags: string[];
    minRating: number;
    minPlayCount: number;
    duration: string[];
}

export default function AdvancedFilters({
    isOpen,
    onClose,
    onApply,
    currentFilters
}: AdvancedFiltersProps) {
    const [filters, setFilters] = useState<FilterOptions>(currentFilters);

    if (!isOpen) return null;

    const durations = ['5-10 min', '10-15 min', '15-20 min', '20-30 min'];

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    const handleReset = () => {
        setFilters({
            categories: [],
            tags: [],
            minRating: 0,
            minPlayCount: 0,
            duration: []
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Advanced Filters</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Filter Sections */}
                <div className="space-y-6">
                    {/* Rating Filter */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 mb-3">Minimum Rating</h3>
                        <div className="flex items-center space-x-4">
                            <input
                                type="range"
                                min="0"
                                max="5"
                                step="0.5"
                                value={filters.minRating}
                                onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
                                className="flex-1"
                            />
                            <div className="flex items-center space-x-1">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="w-8 text-center">{filters.minRating}</span>
                            </div>
                        </div>
                    </div>

                    {/* Play Count Filter */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 mb-3">Minimum Play Count</h3>
                        <div className="flex items-center space-x-4">
                            <input
                                type="range"
                                min="0"
                                max="5000"
                                step="100"
                                value={filters.minPlayCount}
                                onChange={(e) => setFilters({ ...filters, minPlayCount: parseInt(e.target.value) })}
                                className="flex-1"
                            />
                            <span className="w-16 text-center">{filters.minPlayCount}</span>
                        </div>
                    </div>

                    {/* Duration Filter */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 mb-3">Game Duration</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {durations.map(duration => (
                                <label
                                    key={duration}
                                    className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-800"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.duration.includes(duration)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFilters({ ...filters, duration: [...filters.duration, duration] });
                                            } else {
                                                setFilters({ ...filters, duration: filters.duration.filter(d => d !== duration) });
                                            }
                                        }}
                                        className="w-4 h-4 text-lime-400 bg-gray-800 border-gray-600 rounded focus:ring-lime-400"
                                    />
                                    <span className="text-sm">{duration}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                        Reset Filters
                    </button>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleApply}
                            className="px-6 py-2 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition-colors"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}