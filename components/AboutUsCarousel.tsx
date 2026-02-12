'use client';

import React from "react"

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import {
  Heart,
  Users,
  Globe,
  TrendingUp,
  Award,
  Shield,
  Star,
  Target,
  Sparkles,
} from 'lucide-react';
import {
  ABOUT_DESCRIPTION,
  LEADERSHIP_TEAM,
  WHAT_WE_DO_ITEMS,
  WHY_CHOOSE_US,
  CORE_VALUES,
} from '@/lib/constants';

const iconMap: Record<string, React.ComponentType<any>> = {
  Heart,
  Users,
  Globe,
  TrendingUp,
  Award,
  Shield,
  Star,
  Target,
  Sparkles,
};

type ComponentType = 'leadership' | 'what-we-do' | 'why-choose-us' | 'core-values';

const LeadershipTeamComponent = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {LEADERSHIP_TEAM.map((member, index) => (
        <div
          key={index}
          className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{
            transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
          }}
        >
          <div className="mb-6">
            <div className="relative w-40 h-40 md:w-64 md:h-64 mx-auto rounded-lg overflow-hidden gradient-card border border-primary/10 shadow-md hover:shadow-lg transition-all duration-300">
              <Image
                src={member.image || '/images/logo.png'}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <h4 className="text-lg md:text-xl font-bold text-primary mb-2">
            {member.name}
          </h4>
          <p className="text-secondary font-semibold mb-3">{member.role}</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            {member.description}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const WhatWeDoComponent = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
    <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-6">
      {WHAT_WE_DO_ITEMS.map((item, index) => {
        const Icon = iconMap[item.icon as string];
        return (
          <div
            key={index}
            className={`p-6 rounded-lg gradient-card hover:gradient-card-hover border border-primary/10 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms', }}
          >
            {Icon && <Icon size={36} className="text-primary mb-4" />}
            <h4 className="text-lg font-bold text-primary mb-2">
              {item.title}
            </h4>
            <p className="text-sm text-slate-600">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  </div>
);

const WhyChooseUsComponent = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {WHY_CHOOSE_US.map((item, index) => {
        const Icon = iconMap[item.icon as string];
        return (
          <div
            key={index}
            className={`p-6 rounded-lg gradient-card hover:gradient-card-hover border border-primary/10 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{
              transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
            }}
          >
            {Icon && <Icon size={36} className="text-primary mb-4" />}
            <h4 className="text-lg font-bold text-primary mb-2">
              {item.title}
            </h4>
            <p className="text-sm text-slate-600">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  </div>
);

const CoreValuesComponent = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {CORE_VALUES.map((value, index) => (
        <div
          key={index}
          className={`p-6 rounded-lg gradient-card hover:gradient-card-hover border border-primary/10 transition-all duration-300 text-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{
            transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
          }}
        >
          <h4 className="text-lg font-bold text-primary mb-2">
            {value.title}
          </h4>
          <p className="text-sm text-slate-600">
            {value.description}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default function AboutUsCarousel() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentComponent, setCurrentComponent] = useState<ComponentType>('leadership');
  const [isLoading, setIsLoading] = useState(false);
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

  const components: { id: ComponentType; label: string; component: React.ReactNode }[] = [
    {
      id: 'leadership',
      label: 'Our Leadership Team',
      component: <LeadershipTeamComponent isVisible={isVisible && currentComponent === 'leadership'} />,
    },
    {
      id: 'what-we-do',
      label: 'What We Do',
      component: <WhatWeDoComponent isVisible={isVisible && currentComponent === 'what-we-do'} />,
    },
    {
      id: 'why-choose-us',
      label: 'Why Choose Us',
      component: <WhyChooseUsComponent isVisible={isVisible && currentComponent === 'why-choose-us'} />,
    },
    {
      id: 'core-values',
      label: 'Our Core Values',
      component: <CoreValuesComponent isVisible={isVisible && currentComponent === 'core-values'} />,
    },
  ];

  const handleNextComponent = () => {
    setIsLoading(true);
    setTimeout(() => {
      const currentIndex = components.findIndex((comp) => comp.id === currentComponent);
      const nextIndex = (currentIndex + 1) % components.length;
      setCurrentComponent(components[nextIndex].id);
      setIsLoading(false);
    }, 2000);
  };

  const handleComponentClick = (componentId: ComponentType) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentComponent(componentId);
      setIsLoading(false);
    }, 2000);
  };

  const currentLabel = components.find((comp) => comp.id === currentComponent)?.label || '';

  return (
    <section
      id="about"
      ref={ref}
      className="w-full py-16 md:py-24 lg:py-32 bg-white relative"
    >
      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#A7833F]/30" />

      <div className="max-w-[90%] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#193358] mb-4">
            About Us
          </h2>
          <div className="w-20 h-1 bg-[#A7833F] mx-auto rounded-full" />
        </div>

        {/* Company Description */}
        <div
          className={`mx-auto mb-16 md:mb-24 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <div className="space-y-6 bg-[#193358]/5 p-8 md:p-12 rounded-xl border border-[#193358]/10 shadow-sm">
            {ABOUT_DESCRIPTION.split('\n\n').map((paragraph, index) => (
              <p
                key={index}
                className="text-base md:text-lg text-slate-700 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Component Heading with Arrow Navigation */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#193358]">
              {currentLabel}
            </h3>
            <button
              onClick={handleNextComponent}
              disabled={isLoading}
              className="hover:bg-[#A7833F] bg-[#193358] text-white p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Next component"
              title="Click to view next component"
            >
              <ChevronRight size={20} className={`md:w-8 md:h-8 lg:w-10 lg:h-10 ${isLoading ? 'hidden' : ''}`} />
            </button>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 w-full h-full flex flex-col items-center justify-center z-50 py-10 rounded-2xl text-center mb-4">
            <div className="flex flex-col items-center justify-center rounded-xl bg-white/90 py-8">
              <div className="flex items-center justify-center rounded-full">
                <Image
                  src="/images/logo.png"
                  alt="CHS Logo"
                  width={300}
                  height={300}
                  className="flex relative object-contain animate-pulse"
                />
              </div>
              <div className="text-primary font-semibold text-base lg:text-xl italic">Loading...</div>
            </div>
          </div>
        )}

        {/* Active Component Display with section IDs */}
        <div className="mt-16 md:mt-20">
          <div id="about-leadership" className={currentComponent === 'leadership' ? '' : 'hidden'}>
            {components.find((comp) => comp.id === 'leadership')?.component}
          </div>
          <div id="about-what-we-do" className={currentComponent === 'what-we-do' ? '' : 'hidden'}>
            {components.find((comp) => comp.id === 'what-we-do')?.component}
          </div>
          <div id="about-why-choose-us" className={currentComponent === 'why-choose-us' ? '' : 'hidden'}>
            {components.find((comp) => comp.id === 'why-choose-us')?.component}
          </div>
          <div id="about-core-values" className={currentComponent === 'core-values' ? '' : 'hidden'}>
            {components.find((comp) => comp.id === 'core-values')?.component}
          </div>
        </div>
      </div>
    </section>
  );
}
