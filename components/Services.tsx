'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Stethoscope, CheckCircle } from 'lucide-react';
import { SERVICES } from '@/lib/constants';

const iconMap: any = {
  Stethoscope,
  CheckCircle,
};

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(0);
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
      id="services"
      ref={ref}
      className="w-full py-16 md:py-24 lg:py-32 bg-white"
    >
      <div className="max-w-[90%] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Decorative accent line */}
        <div className="h-1 w-44 bg-secondary rounded-full mx-auto mb-4" />
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Offerings & Services
          </div>
          <div className="text-base md:text-lg text-slate-700 max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed for your institution's success
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon];
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={service.id}
                className={`transition-all duration-700 ${isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                  }`}
                style={{
                  transitionDelay: isVisible ? `${index * 200}ms` : '0ms',
                }}
              >
                {/* Service Card */}
                <div className="relative group">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-secondary/5 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Card content */}
                  <div
                    className="relative gradient-card border border-primary/10 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:border-secondary shadow-sm"
                    onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                  >
                    {/* Header section */}
                    <div className="p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="shrink-0">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 group-hover:bg-secondary/20 transition-all duration-300">
                            <Icon className="w-8 h-8 text-primary" />
                          </div>
                        </div>

                        {/* Title section */}
                        <div className="flex-1">
                          <h3 className="text-lg md:text-xl font-bold text-primary mb-2">
                            {service.title}
                          </h3>
                          <p className="text-sm md:text-base text-slate-700">
                            {service.description}
                          </p>
                        </div>

                        {/* Expand icon */}
                        <div className="shrink-0">
                          <ChevronDown
                            size={24}
                            className={`text-primary transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''
                              }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Expandable content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'
                        }`}
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-primary/10 pt-6">
                        <ul className="space-y-3">
                          {service.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex gap-3 items-start animate-slide-up"
                              style={{
                                animationDelay: `${itemIndex * 50}ms`,
                              }}
                            >
                              <span className="shrink-0 w-2 h-2 rounded-full bg-secondary mt-2" />
                              <span className="text-sm md:text-base text-slate-700 leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA Button in expanded view */}
                        <button className="mt-6 w-full px-4 py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 shadow-md">
                          Learn More
                        </button>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-amber-500 to-emerald-600 group-hover:w-full transition-all duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-gray-700 mb-6">
            Need a customized solution for your organization?
          </p>
          <a
            href="#contact"
            className="group relative px-8 py-4 bg-primary text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95 text-base shadow-lg"
          >
            Get a Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
