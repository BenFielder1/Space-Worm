// pages/index.tsx or app/page.tsx (depending on your Next.js version)
// import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        {/* <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl animate-pulse"></div> */}
        {/* <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div> */}
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-lime-400/5 rounded-full blur-3xl animate-pulse delay-500"></div> */}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-black rounded-full"></div>
            </div>
            <span className="text-xl font-bold">Space Worm</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="#games" className="hover:text-lime-400 transition-colors">Games</Link>
            <Link href="#about" className="hover:text-lime-400 transition-colors">About</Link>
            <Link href="#contact" className="hover:text-lime-400 transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
                {/* Recreating your logo with CSS */}
                <div className="relative">
                  <div className="w-20 h-20 md:w-32 md:h-32 bg-lime-500 rounded-full relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-lime-600 rounded-full"></div>
                  </div>
                  <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2 w-16 h-12 md:w-24 md:h-16 bg-lime-500 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-20 h-20 md:w-32 md:h-32 border-4 border-white rounded-full"></div>
                  <div className="absolute -top-2 -right-8 text-orange-400 text-xs md:text-sm font-bold">TM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-lime-200 to-lime-500 bg-clip-text text-transparent">
            Space Worm
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Game Development Studio
          </p>
          
          {/* Description */}
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Explore our collection of interactive games and creative sketches built with Unity and C#. 
            Dive into immersive experiences that push the boundaries of creativity and technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="#games"
              className="px-8 py-4 bg-lime-500 text-black font-semibold rounded-full hover:bg-lime-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-lime-500/25"
            >
              View Games
            </Link>
            <Link 
              href="#sketches"
              className="px-8 py-4 border-2 border-lime-500 text-lime-500 font-semibold rounded-full hover:bg-lime-500 hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              Browse Sketches
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-lime-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-lime-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-lime-400">
            What We Create
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-lime-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-lime-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-lime-500/30 transition-colors">
                <div className="w-6 h-6 bg-lime-500 rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-lime-400">Unity Games</h3>
              <p className="text-gray-400 leading-relaxed">
                Full-featured games built with Unity engine, showcasing advanced gameplay mechanics and immersive experiences.
              </p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-lime-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-lime-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-lime-500/30 transition-colors">
                <div className="w-6 h-6 bg-lime-500 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-lime-400">Creative Sketches</h3>
              <p className="text-gray-400 leading-relaxed">
                Experimental prototypes and creative coding sketches that explore new ideas and concepts.
              </p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-lime-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-lime-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-lime-500/30 transition-colors">
                <div className="w-6 h-6 bg-lime-500 rounded-lg transform rotate-45"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-lime-400">C# Development</h3>
              <p className="text-gray-400 leading-relaxed">
                Clean, efficient code written in C# that powers engaging gameplay and interactive experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-lime-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-full"></div>
            </div>
            <span className="text-lg font-bold">Space Worm</span>
          </div>
          <p className="text-gray-400">
            © 2024 Space Worm. Crafting digital experiences with passion.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;