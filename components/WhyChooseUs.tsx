'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Shield,
  Star,
  Target,
  Sparkles,
} from 'lucide-react';
import { WHY_CHOOSE_US } from '@/lib/constants';

const iconMap: any = {
  Shield,
  Star,
  Target,
  Sparkles,
};

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-choose-us"
      ref={ref}
      className="w-full py-16 md:py-24 lg:py-32 bg-white"
    >
      <div className="max-w-[90%] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="h2 text-dark mb-4">
            Why <span className="gradient-text">Choose Us?</span>
          </h2>
          <p className="text-base md:text-lg text-gray-dark max-w-2xl mx-auto">
            Discover what sets CHS apart in healthcare capacity building
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {WHY_CHOOSE_US.map((feature, index) => {
            const Icon = iconMap[feature.icon];

            return (
              <div
                key={index}
                className={`group relative bg-gradient-soft border border-gray-200 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:shadow-lg hover:-translate-y-2 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                }}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-700/0 via-amber-500/0 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Icon */}
                <div className="relative z-10 mb-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-linear-to-br from-blue-700/10 to-amber-500/10 group-hover:from-blue-700/20 group-hover:to-amber-500/20 transition-all duration-300">
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-blue-700 group-hover:text-amber-500 transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="h4 text-dark mb-3 group-hover:text-blue-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-dark leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover line */}
                <div className="absolute top-0 left-0 w-0 h-1 bg-linear-to-r from-amber-500 to-emerald-600 group-hover:w-full transition-all duration-500 rounded-t-2xl" />
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-24">
          <div className="text-center p-8 bg-linear-to-br from-blue-700/5 to-amber-500/5 rounded-2xl border border-gray-200 hover:border-blue-700/50 transition-all duration-300">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-700 mb-2">
              100+
            </div>
            <p className="text-gray-700 font-medium">
              Subject Matter Experts
            </p>
          </div>

          <div className="text-center p-8 bg-linear-to-br from-amber-500/5 to-emerald-600/5 rounded-2xl border border-gray-200 hover:border-amber-500/50 transition-all duration-300">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-600 mb-2">
              50+
            </div>
            <p className="text-gray-700 font-medium">
              Training Programs
            </p>
          </div>

          <div className="text-center p-8 bg-linear-to-br from-emerald-600/5 to-blue-700/5 rounded-2xl border border-gray-200 hover:border-emerald-600/50 transition-all duration-300">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-600 mb-2">
              1000+
            </div>
            <p className="text-gray-700 font-medium">
              Professionals Trained
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
