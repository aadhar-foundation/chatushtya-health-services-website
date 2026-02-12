'use client';

import React from "react"

import { useEffect, useRef, useState } from 'react';
import {
  Heart,
  Users,
  Globe,
  TrendingUp,
  Award,
} from 'lucide-react';
import { WHAT_WE_DO_ITEMS } from '@/lib/constants';

const iconMap: Record<string, React.ComponentType<any>> = {
  Heart,
  Users,
  Globe,
  TrendingUp,
  Award,
};

export default function WhatWeDo() {
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
      id="what-we-do"
      ref={ref}
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-soft"
    >
      <div className="max-w-[90%] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="h2 text-dark mb-4">
            What We <span className="gradient-text">Do?</span>
          </h2>
          <p className="text-base md:text-lg text-gray-dark max-w-2xl mx-auto">
            Comprehensive healthcare capacity building and professional development
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {WHAT_WE_DO_ITEMS.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-6 md:p-8 transition-all duration-500 hover:shadow-lg hover:scale-105 border border-gray-200 hover:border-secondary transform ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-2xlopacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Icon Container */}
                <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-linear-to-br from-blue-700/10 to-amber-500/10 group-hover:from-blue-700/20 group-hover:to-amber-500/20 transition-all duration-300">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-blue-700 group-hover:text-amber-500 transition-colors" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="h4 text-dark mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-dark leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-6 w-0 h-1 bg-linear-to-r from-amber-500 to-emerald-600 group-hover:w-12 transition-all duration-300" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-gray-dark mb-4">
            Ready to transform your healthcare institution?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300 hover:shadow-lg"
          >
            Start Your Journey
          </a>
        </div>
      </div>
    </section>
  );
}
