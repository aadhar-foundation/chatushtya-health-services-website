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
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8">
      {LEADERSHIP_TEAM.map((member, index) => (
        <div
          key={index}
          className={`text-center transition-all hover:scale-110 duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms', }}>
          <div className="mb-6">
            <div className="relative w-60 h-60 md:w-64 md:h-64 mx-auto rounded-lg overflow-hidden gradient-card border border-primary/10 shadow-md hover:shadow-lg transition-all duration-300">
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6">
      {WHAT_WE_DO_ITEMS.map((item, index) => {
        const Icon = iconMap[item.icon as string];
        return (
          <div
            key={index}
            className={`group p-6 rounded-lg flex flex-col text-center items-center justify-center text-primary-hover gradient-card hover:gradient-card-hover border border-primary hover:border-[#A7833F] transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms', }}
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon size={36} className="mb-4" />}
              <div className="text-xl font-bold mb-2">
                {item.title}
              </div>
            </div>
            <div className="text-sm opacity-70">
              {item.description}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const WhyChooseUsComponent = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
    {WHY_CHOOSE_US.map((item, index) => {
      const Icon = iconMap[item.icon as string];
      return (
        <div key={index}
          className={`group rounded-xl flex flex-col h-full transition-all duration-300 shadow-md hover:shadow-xl hover:scale-110 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: `${index * 100}ms` }}>
          {/* Header with Icon and Title */}
          <div className="w-full flex items-center justify-start gap-2 p-4 bg-primary group-hover:bg-[#A7833F] rounded-t-xl text-white transition-colors duration-300">
            {Icon && (<Icon className="w-7 h-7 md:w-8 md:h-8" />)}
            <div className="text-sm md:text-base xl:text-lg font-semibold leading-tight w-full">
              {item.title}
            </div>
          </div>
          {/* Description */}
          <div className="flex-1 flex text-center group-hover:text-[#A7833F] border border-t-0 border-primary group-hover:border-[#A7833F] text-xs md:text-sm leading-relaxed opacity-80 rounded-b-xl p-4 md:p-5 bg-white transition-colors duration-300">
            {item.description}
          </div>
        </div>
      );
    })}
  </div>
);

const CoreValuesComponent = ({ isVisible }: { isVisible: boolean }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
    {CORE_VALUES.map((value, index) => (
      <div key={index}
        className={`group p-6 rounded-lg text-primary gradient-card hover:gradient-card-hover border border-primary hover:border-[#A7833F] transition-all duration-300 text-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms', }}>
        <div className="text-base font-semibold text-white group-hover:bg-[#A7833F] transition-colors duration-300 p-2 rounded-full px-4 bg-primary mb-2">
          {value.title}
        </div>
        <div className="text-sm mt-5 group-hover:text-[#A7833F] transition-colors duration-300">
          {value.description}
        </div>
      </div>
    ))}
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
      label: 'Our Leaders',
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
      <div className="absolute top-0 left-0 right-0 h-1 bg-secondary/30" />

      <div className="max-w-[90%] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Decorative accent line */}
        <div className="h-1 w-44 bg-secondary rounded-full mx-auto mb-4" />
        {/* Section Title */}
        <div className={`text-center mb-16 md:mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-2">
            About Us
          </div>
        </div>

        {/* Company Description */}
        <div id="about-leadership" className={`mx-auto mb-16 md:mb-24 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="space-y-2 p-6 md:p-10 rounded-xl text-primary shadow-sm hover:shadow-lg transition-all duration-300">
            {ABOUT_DESCRIPTION.split('\n\n').map((paragraph, index) => (
              <div key={index} className="text-xs md:text-base leading-relaxed">
                {paragraph}
              </div>
            ))}
          </div>
        </div>

        {/* Decorative accent line */}
        <div className="h-1 w-44 bg-secondary rounded-full mx-auto mb-4" />
        {/* Component Heading with Arrow Navigation */}
        <section className="group mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-6 flex-wrap mb-2">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold group-hover:text-[#A7833F] transition-colors duration-300">
              {currentLabel}
            </div>
            <button
              onClick={handleNextComponent}
              disabled={isLoading}
              className="hover:bg-secondary bg-primary group-hover:bg-[#A7833F] text-white p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Next component"
              title="Click to view next component"
            >
              <ChevronRight size={20} className="w-8 h-8 lg:w-10 lg:h-10" />
            </button>
          </div>
        </section>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 w-full h-full flex flex-col items-center justify-center z-50 py-10 rounded-2xl text-center mb-4">
            <div className="flex flex-col items-center justify-center rounded-xl bg-white/90 p-4 py-8">
              <div className="relative h-24 w-24 md:h-32 md:w-32 overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="CHS Logo"
                  fill
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="flex items-center justify-center gap-0 my-2">
                <div className="font-bold text-lg md:text-xl lg:text-2xl text-primary">CHATUSTHYA</div>
                <div className="font-bold text-sm md:text-base lg:text-lg text-primary ml-2">HEALTH SERVICES</div>
                <span className="font-medium text-sm md:text-base lg:text-lg ml-2 leading-none">LLP</span>
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
