'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronDown, Heart, Activity, Cross, Zap, TrendingUp } from 'lucide-react';
import { TAGLINE_1, TAGLINE_2, COMPANY_DESCRIPTION, COMPANY_COMMITMENT } from '@/lib/constants';

const FloatingIcon = ({ icon: Icon, delay, duration, position }: any) => (
  <div
    className={`absolute opacity-15 pointer-events-none ${position}`}
    style={{
      animation: `float-slow ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}
  >
    <Icon size={80} className="text-primary" strokeWidth={1.5} />
  </div>
);

const StatCard = ({ value, label, delay, icon: Icon }: any) => (
  <div
    className="group relative p-6 bg-white/90 w-full h-auto backdrop-blur-lg border border-primary/20 rounded-2xl hover:bg-white transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden shadow-md"
    style={{
      animation: `slide-up 0.6s ease-out ${delay}ms`,
    }}
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-3xl md:text-4xl font-bold text-primary">
          {value}
        </div>
        <Icon className="text-secondary opacity-60 group-hover:opacity-100 transition-opacity" size={24} />
      </div>
      <p className="text-sm md:text-base text-slate-700 font-medium">{label}</p>
    </div>
  </div>
);

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-white"
    >
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-slow" />
        <div className="absolute top-1/2 -left-48 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-8 animate-float" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      {/* Floating icons */}
      <FloatingIcon icon={Heart} delay={0} duration={8} position="top-20 left-10" />
      <FloatingIcon icon={Activity} delay={2} duration={10} position="top-1/3 right-20" />
      <FloatingIcon icon={Zap} delay={1} duration={9} position="bottom-1/3 left-1/4" />
      <FloatingIcon icon={TrendingUp} delay={3} duration={11} position="bottom-20 right-1/4" />

      {/* Content */}
      <div className="relative z-20 max-w-[90%] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          
          {/* Left Content */}
          <div className={`space-y-8 md:space-y-10 col-span-2 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center text-primary-hover gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary hover:border-[#A7833F] w-fit">
              <Zap size={16} className="" />
              <span className="text-sm font-semibold ">Transforming Healthcare</span>
            </div>

            {/* Main Heading with gradient */}
            <div className="space-y-4">
              <div className="text-3xl md:text-4xl xl:text-5xl font-bold leading-tight text-primary">
                {TAGLINE_1}
              </div>
              <div className="text-xl md:text-2xl xl:text-3xl font-bold text-secondary">
                {TAGLINE_2}
              </div>
            </div>

            {/* Description */}
            <div className="text-base xl:text-lg text-primary max-w-3xl leading-relaxed">
              {COMPANY_DESCRIPTION}
            </div>

            <div className="text-base xl:text-lg text-primary max-w-3xl leading-relaxed">
              {COMPANY_COMMITMENT}
            </div>

            {/* CTA Buttons with hover effects */}
            <div className="flex gap-4 pt-0 md:pt-4">
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-4 py-2 md:px-8 md:py-4 relative bg-primary text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95 text-sm md:text-base shadow-lg"
              >
                <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  Explore Services
                  <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-4 py-2 md:px-8 md:py-4 border-2 border-primary text-primary-hover font-semibold rounded-xl hover:border-[#A7833F] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-95 text-sm md:text-base shadow-md"
              >
                <span className="flex items-center justify-center gap-2">
                  Get in Touch
                  <ChevronDown size={20} className="group-hover:rotate-180 transition-transform" />
                </span>
              </button>
            </div>
          </div>

          {/* Right Side - Stats Grid */}
          <div className={`hidden lg:grid grid-cols-2 col-span-1 gap-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <StatCard value="100+" label="Subject Matter Experts" delay={200} icon={Heart} />
            <StatCard value="50+" label="Training Programs" delay={300} icon={Activity} />
            <StatCard value="1000+" label="Professionals Trained" delay={400} icon={TrendingUp} />
            <StatCard value="15+" label="Years of Excellence" delay={500} icon={Zap} />
          </div>
        </div>

        {/* Mobile Stats - Show below on small screens */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mt-12">
          <StatCard value="100+" label="Experts" delay={200} icon={Heart} />
          <StatCard value="50+" label="Programs" delay={300} icon={Activity} />
          <StatCard value="1000+" label="Trained" delay={400} icon={TrendingUp} />
          <StatCard value="15+" label="Years" delay={500} icon={Zap} />
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-dark">Scroll to explore</span>
          <ChevronDown size={24} className="text-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
}
