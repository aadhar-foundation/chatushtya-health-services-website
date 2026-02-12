'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { CLIENTS } from '@/lib/constants';

export default function Clients() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState<(typeof CLIENTS)[0] | null>(null);
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

  useEffect(() => {
    // Handle escape key press
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedClient(null);
      }
    };

    if (selectedClient) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedClient]);

  return (
    <section
      id="clients"
      ref={ref}
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-soft"
    >
      <div className="max-w-[90%] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="h2 text-dark mb-4">
            Our <span className="gradient-text">Clients</span>
          </h2>
          <p className="text-base md:text-lg text-gray-dark max-w-2xl mx-auto">
            Trusted by leading healthcare institutions across India
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-3xl mx-auto">
          {CLIENTS.map((client, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
              }}
            >
              <button
                onClick={() => setSelectedClient(client)}
                className="w-full group relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-secondary bg-white p-8 md:p-12 transition-all duration-300 hover:shadow-lg cursor-pointer"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-secondary/5 to-tertiary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Logo placeholder */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-linear-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                    <span className="text-2xl md:text-3xl font-bold text-primary">
                      {client.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
                    </span>
                  </div>

                  {/* Client Name */}
                  <h3 className="h4 text-dark mb-2 text-left">
                    {client.fullName}
                  </h3>

                  {/* Description preview */}
                  <p className="text-sm md:text-base text-gray-dark text-left line-clamp-2">
                    {client.description.split('.')[0]}.
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-4 inline-flex items-center text-primary font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                    Click to learn more
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-secondary to-tertiary group-hover:w-full transition-all duration-300" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedClient(null)}
          />

          {/* Modal Content */}
          <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-slide-up z-10">
            {/* Close Button */}
            <button
              onClick={() => setSelectedClient(null)}
              className="absolute top-4 right-4 p-2 hover:bg-light rounded-lg transition-colors z-20"
              aria-label="Close modal"
            >
              <X size={24} className="text-primary" />
            </button>

            {/* Modal Content */}
            <div className="p-6 md:p-10">
              {/* Header */}
              <div className="mb-6 md:mb-8">
                <div className="w-20 h-20 md:w-28 md:h-28 bg-linear-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-3xl md:text-5xl font-bold text-primary">
                    {selectedClient.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
                  </span>
                </div>
                <h3 className="h2 text-dark mb-2">
                  {selectedClient.fullName}
                </h3>
              </div>

              {/* Description */}
              <div className="space-y-4 md:space-y-6">
                {selectedClient.description.split('\n').map((paragraph, index) => {
                  if (!paragraph.trim()) return null;
                  
                  if (paragraph.startsWith('•')) {
                    return (
                      <div key={index} className="flex gap-3 items-start">
                        <span className="shrink-0 w-2 h-2 rounded-full bg-linear-to-r from-secondary to-tertiary mt-2" />
                        <p className="text-sm md:text-base text-gray-dark">
                          {paragraph.substring(1).trim()}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <p
                      key={index}
                      className="text-sm md:text-base text-gray-dark leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div className="mt-8 md:mt-10">
                <a
                  href="#contact"
                  onClick={() => setSelectedClient(null)}
                  className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-300 hover:shadow-lg"
                >
                  Explore Partnership
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
