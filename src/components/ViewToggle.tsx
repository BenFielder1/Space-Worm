// components/ViewToggle.tsx
'use client';

interface ViewToggleProps {
    view: 'grid' | 'list';
    onViewChange: (view: 'grid' | 'list') => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
    return (
        <div className="flex items-center bg-gray-800 rounded-lg p-1 w-20">
            <button
                onClick={() => onViewChange('grid')}
                className={`p-2 rounded transition-all ${view === 'grid'
                        ? 'bg-lime-400 text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                aria-label="Grid view"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                </svg>
            </button>
            <button
                onClick={() => onViewChange('list')}
                className={`p-2 rounded transition-all ${view === 'list'
                        ? 'bg-lime-400 text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                aria-label="List view"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
        </div>
    );
}