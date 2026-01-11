import React from 'react';
import { Particles } from "@/components/ui/particles";
import img1 from '../../assets/hero_rw1.jpeg'
import img2 from '../../assets/hero_rw2.jpeg'
import img3 from '../../assets/hero_rw3.jpeg'

const Hero = () => {
  // Slate Grey particles for a subtle "dust/memory" effect
  const particleColor = "#94a3b8"; 

  return (
    // CHANGED: 
    // from-slate-50 via-white to-cyan-50/30
    // This adds a very faint, premium blue glow to the bottom right corner.
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50/40 pt-28 pb-16 lg:h-[600px] flex items-center">

      {/* --- PARTICLES BACKGROUND --- */}
      <Particles
        className="absolute inset-0 z-0 opacity-50"
        quantity={60} 
        ease={80}
        color={particleColor}
        refresh
      />

      {/* --- THE "BAKERSTREET" CIRCLE IMAGES (Z-10) --- */}

      {/* 1. Top Right Large Circle */}
      <div className="absolute hidden lg:block top-[-1%] right-[15%] w-[320px] h-[320px] rounded-full overflow-hidden border-[6px] border-white shadow-xl z-10 animate-fade-in-up">
        <img
          src={img1}
          alt="Elder Teaching Youth"
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* 2. Middle Far Right Circle */}
      <div className="absolute hidden lg:block top-[30%] right-[-2%] w-[260px] h-[260px] rounded-full overflow-hidden border-[6px] border-white shadow-xl z-20 animate-fade-in-left delay-100">
        <img
          src={img2}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* 3. Bottom Center Circle */}
      <div className="absolute hidden lg:block bottom-[-5%] left-[48%] w-[280px] h-[280px] rounded-full overflow-hidden border-[6px] border-white shadow-xl z-10 animate-fade-in-up delay-200">
        <img
          src={img3}
          alt="Happy Child"
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* --- CONTENT SECTION (Z-30) --- */}
      <div className="relative z-30 px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl w-full pointer-events-none">
        <div className="w-full lg:w-1/2 pointer-events-auto">

          {/* Headline */}
          <h1 className="tracking-tighter leading-tight mt-10">
            <span className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-800 block mb-2">
              Stability for those <br className="hidden lg:block" /> who raised us,
            </span>
            <span className="font-serif italic font-normal text-4xl sm:text-5xl lg:text-5xl text-cyan-500 block">
              Wings for those <br className="hidden lg:block" /> who will lead us.
            </span>
          </h1>

          <p className="mt-6 font-sans text-sm sm:text-base font-normal leading-relaxed text-slate-600 max-w-md">
            <strong>Roots & Wings</strong> is an integrated sanctuary where elders share wisdom and children find a home.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
            <a href="#adopt" className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white transition-all duration-200 bg-cyan-500 rounded-full shadow-md hover:bg-cyan-600 hover:shadow-cyan-500/40 hover:-translate-y-0.5">
              Get Started
            </a>

            <a href="#story" className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-cyan-200 hover:text-cyan-600">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M8.0416 4.9192C7.37507 4.51928 6.5271 4.99939 6.5271 5.77669L6.5271 18.2232C6.5271 19.0005 7.37507 19.4806 8.0416 19.0807L18.4137 12.8574C19.061 12.469 19.061 11.5308 18.4137 11.1424L8.0416 4.9192Z" /></svg>
              Watch Story
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Image Fallback */}
      <div className="lg:hidden absolute bottom-0 right-0 w-2/3 h-2/3 opacity-20 pointer-events-none">
        <img src="https://img.freepik.com/free-vector/happy-grandparents-day-background_23-2148595537.jpg" className="w-full h-full object-cover mask-image-gradient" alt="Background" />
      </div>

    </div>
  )
}
export default Hero;