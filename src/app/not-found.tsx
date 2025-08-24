import Link from 'next/link';
import Image from 'next/image';
// import StarField from '@/components/StarField';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
            {/* <div className="fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
                <StarField />
            </div> */}
            <div className="text-center z-10">
                <Image
                    src="/space-worm-logo.png"
                    alt="Space Worm"
                    width={120}
                    height={120}
                    className="mx-auto mb-8 opacity-50"
                />
                <h1 className="text-6xl font-bold mb-4 text-lime-400">404</h1>
                <h2 className="text-2xl mb-4">Lost in Space</h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Looks like this wormhole led nowhere. Let&apos;s get you back to familiar territory.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 bg-lime-400 text-black font-semibold rounded-full hover:bg-lime-300 transition-all"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Return Home
                </Link>
            </div>
        </div>
    );
}