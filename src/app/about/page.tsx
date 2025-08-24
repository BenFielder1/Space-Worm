// app/about/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
// import StarField from '@/components/StarField';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function AboutPage() {
    const skills = [
        'Unity', 'C#', 'WebGL', 'Game Design',
        '3D Modeling', 'Physics Simulation', 'AI Programming',
        'TypeScript', 'React', 'Next.js', 'Tailwind CSS'
    ];

    const stats = [
        { label: 'Games Created', value: '6+' },
        { label: 'Years Experience', value: '5' },
        { label: 'Lines of Code', value: '100K+' },
        // { label: 'Coffee Consumed', value: '∞' }
    ];

    const timeline = [
        {
            year: '2019',
            title: 'The Beginning',
            description: 'Started learning Unity and game development'
        },
        {
            year: '2020',
            title: 'First Game Launch',
            description: 'Released first WebGL game to positive feedback'
        },
        {
            year: '2021',
            title: 'Skill Expansion',
            description: 'Learned advanced physics simulation and AI programming'
        },
        {
            year: '2022',
            title: 'Growing Library',
            description: 'Developed multiple game prototypes and experiments'
        },
        {
            year: '2023',
            title: 'Space Worm Born',
            description: 'Created Space Worm platform to showcase all games'
        },
        {
            year: '2024',
            title: 'Continuous Innovation',
            description: 'Launching new games and improving the platform'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background */}
            {/* <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
                <StarField />
            </div> */}

            <Header />

            {/* Hero Section */}
            <section className="relative z-10 px-6 py-16 md:px-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-lime-400 bg-clip-text text-transparent">
                        About Space Worm
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        A solo developer&apos;s journey through the cosmos of game development
                    </p>
                </div>
            </section>

            {/* Developer Profile */}
            <section className="relative z-10 px-6 py-16 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
                        <div className="md:flex">
                            {/* Profile Image Section */}
                            <div className="md:w-1/3 p-8 flex items-center justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 blur-3xl bg-lime-400/20 rounded-full"></div>
                                    <div className="relative w-48 h-48 md:w-64 md:h-64 bg-gray-800 rounded-full overflow-hidden border-4 border-lime-400/50">
                                        {/* Placeholder for Ben's photo */}
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Image
                                                src="/profile.jpg"
                                                alt="Ben Fielder"
                                                fill
                                                style={{ objectFit: "cover" }}
                                                priority
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-lime-400 text-black px-4 py-2 rounded-full font-semibold">
                                        Solo Dev
                                    </div>
                                </div>
                            </div>

                            {/* Bio Section */}
                            <div className="md:w-2/3 p-8">
                                <h2 className="text-3xl font-bold mb-2">Ben Fielder</h2>
                                <p className="text-lime-400 text-lg mb-6">Creator, Developer, Designer</p>

                                <div className="space-y-4 text-gray-300 leading-relaxed">
                                    <p>
                                        Hey there! I&apos;m Ben, the sole developer behind Space Worm. What started as a curiosity
                                        about game development has evolved into a passion for creating unique, engaging experiences
                                        that are playable on web and mobile.
                                    </p>
                                    <p>
                                        I handle every aspect of game development here at Space Worm - from initial concept and
                                        design to programming and deployment. Each game represents countless hours
                                        of learning, experimenting, and refining to create something special.
                                    </p>
                                    {/* <p>
                                        My journey in game development began with Unity and C#, and has expanded to include
                                        web technologies, physics simulations, and AI programming. Every project is an opportunity
                                        to learn something new and share that creativity with players around the world.
                                    </p> */}
                                </div>

                                {/* Social Links */}
                                <div className="flex items-center space-x-4 mt-8">
                                    <Link
                                        href="https://benfielder.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                                        aria-label="portfolio"
                                    >
                                        <svg className="h-6 w-6 group-hover:text-lime-400 transition-colors" fill="currentColor" viewBox="0 0 640 640">
                                            <path d="M415.9 344L225 344C227.9 408.5 242.2 467.9 262.5 511.4C273.9 535.9 286.2 553.2 297.6 563.8C308.8 574.3 316.5 576 320.5 576C324.5 576 332.2 574.3 343.4 563.8C354.8 553.2 367.1 535.8 378.5 511.4C398.8 467.9 413.1 408.5 416 344zM224.9 296L415.8 296C413 231.5 398.7 172.1 378.4 128.6C367 104.2 354.7 86.8 343.3 76.2C332.1 65.7 324.4 64 320.4 64C316.4 64 308.7 65.7 297.5 76.2C286.1 86.8 273.8 104.2 262.4 128.6C242.1 172.1 227.8 231.5 224.9 296zM176.9 296C180.4 210.4 202.5 130.9 234.8 78.7C142.7 111.3 74.9 195.2 65.5 296L176.9 296zM65.5 344C74.9 444.8 142.7 528.7 234.8 561.3C202.5 509.1 180.4 429.6 176.9 344L65.5 344zM463.9 344C460.4 429.6 438.3 509.1 406 561.3C498.1 528.6 565.9 444.8 575.3 344L463.9 344zM575.3 296C565.9 195.2 498.1 111.3 406 78.7C438.3 130.9 460.4 210.4 463.9 296L575.3 296z"></path>
                                        </svg>
                                    </Link>
                                    <Link
                                        href="https://github.com/BenFielder1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                                        aria-label="GitHub"
                                    >
                                        <svg className="h-6 w-6 group-hover:text-lime-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                                        </svg>
                                    </Link>
                                    <Link
                                        href="https://www.linkedin.com/in/ben-fielder-38a9ba276/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                                        aria-label="LinkedIn"
                                    >
                                        <svg className="h-6 w-6 group-hover:text-lime-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="relative z-10 px-6 py-16 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-6 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full text-gray-300 hover:border-lime-400 hover:text-lime-400 transition-all"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative z-10 px-6 py-16 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-lime-400 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="relative z-10 px-6 py-16 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">The Journey</h2>
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 md:-translate-x-1/2"></div>

                        {/* Timeline Items */}
                        <div className="space-y-12">
                            {timeline.map((item, index) => (
                                <div key={item.year} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}>
                                    {/* Year Badge */}
                                    <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-lime-400 rounded-full flex items-center justify-center -translate-x-1/2 z-10">
                                        <span className="text-black font-bold text-sm">{item.year}</span>
                                    </div>

                                    {/* Content */}
                                    <div className={`ml-32 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                                        }`}>
                                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-lime-400/50 transition-all">
                                            <h3 className="text-xl font-semibold mb-2 text-lime-400">{item.title}</h3>
                                            <p className="text-gray-300">{item.description}</p>
                                        </div>
                                    </div>

                                    {/* Spacer for alternating layout */}
                                    <div className="hidden md:block md:w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="relative z-10 px-6 py-16 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 md:p-12">
                        <h2 className="text-3xl font-bold mb-6 text-center">Development Philosophy</h2>
                        <div className="space-y-6 text-gray-300 leading-relaxed">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-black font-bold">1</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Player Experience First</h3>
                                    <p>Every design decision starts with the question: &quot;Will this make the game more enjoyable?&quot;
                                        The goal is to create experiences that are intuitive, engaging, and memorable.</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-black font-bold">2</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Continuous Learning</h3>
                                    <p>Each game is an opportunity to explore new techniques, whether it&apos;s implementing
                                        advanced physics, experimenting with AI behaviors, or optimizing performance for the web.</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-black font-bold">3</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Quality Over Quantity</h3>
                                    <p>Rather than rushing to release, I take the time to polish each game until it meets
                                        high standards. Every game should feel complete and well-crafted.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 px-6 py-20 md:px-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Play?</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Check out the collection of games and experience the Space Worm universe
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/games"
                            className="px-8 py-3 bg-lime-400 text-black font-semibold rounded-full hover:bg-lime-300 transition-all transform hover:scale-105"
                        >
                            Browse Games
                            <svg className="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/"
                            className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition-all border border-gray-700"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}