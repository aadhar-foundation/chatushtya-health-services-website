'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { LEADERSHIP_TEAM, ABOUT_DESCRIPTION } from '@/lib/constants';

export default function AboutUs() {
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
      id="about"
      ref={ref}
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-soft dark:bg-dark"
    >
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="h2 text-dark dark:text-white mb-4">
            About <span className="gradient-text">Us</span>
          </h2>
        </div>

        {/* Company Description */}
        <div className={`max-w-4xl mx-auto mb-16 md:mb-24 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {ABOUT_DESCRIPTION.split('\n\n').map((paragraph, index) => (
              <p
                key={index}
                className="text-base md:text-lg text-gray-dark dark:text-gray-light leading-relaxed mb-6 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Leadership Team Header */}
        <div className="text-center mb-12 md:mb-16">
          <h3 className="h3 text-dark dark:text-white">
            Our <span className="text-primary">Leadership Team</span>
          </h3>
          <p className="text-gray-dark dark:text-gray-light mt-3">
            Experienced leaders dedicated to healthcare excellence
          </p>
        </div>

        {/* Leadership Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {LEADERSHIP_TEAM.map((member, index) => (
            <div
              key={member.id}
              className={`group transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
              }}
            >
              {/* Card Container */}
              <div className="bg-white dark:bg-card rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-secondary transition-all duration-300 hover:shadow-lg">
                {/* Image Container */}
                <div className="relative h-72 md:h-80 overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                  <Image
                    src={member.image || '/images/placeholder.jpg'}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h4 className="h4 text-dark dark:text-white mb-1">
                    {member.name}
                  </h4>
                  <p className="text-sm md:text-base font-semibold text-secondary mb-4">
                    {member.title}
                  </p>
                  <p className="text-sm md:text-base text-gray-dark dark:text-gray-light leading-relaxed">
                    {member.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-r from-primary via-secondary to-tertiary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Core Values Section */}
        <div className="mt-16 md:mt-24 pt-16 md:pt-24 border-t border-gray-200 dark:border-gray-700">
          <h3 className="h3 text-dark dark:text-white text-center mb-12">
            Our <span className="text-primary">Core Values</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Excellence',
                description: 'Committed to delivering highest quality training and services',
              },
              {
                title: 'Integrity',
                description: 'Operating with transparency and ethical standards',
              },
              {
                title: 'Innovation',
                description: 'Continuously evolving to meet emerging healthcare needs',
              },
              {
                title: 'Impact',
                description: 'Creating meaningful positive change in healthcare',
              },
            ].map((value, index) => (
              <div
                key={index}
                className={`text-center p-6 md:p-8 bg-gradient-soft dark:bg-dark rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary transition-all duration-300 hover:shadow-md ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100 + 600}ms` : '0ms',
                }}
              >
                <h4 className="h4 text-primary mb-2">{value.title}</h4>
                <p className="text-sm md:text-base text-gray-dark dark:text-gray-light">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
