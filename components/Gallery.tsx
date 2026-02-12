'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '@/lib/constants';

const ITEMS_PER_PAGE = 3;

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingImage, setLoadingImage] = useState<number | null>(null);
  const ref = useRef(null);

  const totalPages = Math.ceil(GALLERY_ITEMS.length / ITEMS_PER_PAGE);
  const displayItems = GALLERY_ITEMS.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

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
    // Handle keyboard navigation in lightbox
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === 'Escape') {
        setLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    if (lightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen, selectedIndex]);

  const openLightbox = (index: number) => {
    setLoadingImage(index);
    setTimeout(() => {
      setSelectedIndex(index);
      setLightboxOpen(true);
      setLoadingImage(null);
    }, 2000);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % displayItems.length);
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? displayItems.length - 1 : prev - 1
    );
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section
      id="gallery"
      ref={ref}
      className="w-full py-16 md:py-24 lg:py-32 bg-white"
    >
      <div className="max-w-[90%] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Our Gallery
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Moments of training, learning, and professional development
          </p>
        </div>

        {/* Gallery Grid with 4 items per page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {displayItems.map((item, index) => (
            <div
              key={item.id}
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
              }}
            >
              <div
                className="group relative overflow-hidden rounded-lg cursor-pointer h-64 md:h-72 lg:h-80 gradient-card hover:gradient-card-hover transition-all duration-300 border border-primary/10 shadow-sm hover:shadow-md"
                onClick={() => {
                  setSelectedIndex(currentPage * ITEMS_PER_PAGE + index);
                  setLightboxOpen(true);
                }}
              >
                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Text overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-4">
                  <p className="text-white text-xs md:text-sm font-semibold text-center text-balance leading-snug">
                    {item.description}
                  </p>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {/* Left Arrow */}
          <button
            onClick={handlePrevPage}
            className="p-2 md:p-3 bg-primary hover:bg-secondary text-white rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </button>

          {/* Page Info */}
          <div className="text-center min-w-fit">
            <p className="text-sm md:text-base font-semibold text-primary">
              Page <span className="font-bold">{currentPage + 1}</span> of <span className="font-bold">{totalPages}</span>
            </p>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNextPage}
            className="p-2 md:p-3 bg-primary hover:bg-secondary text-white rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Next page"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-md font-medium transition-all duration-300 text-sm md:text-base ${
                currentPage === index
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-primary hover:bg-primary hover:text-white'
              }`}
              aria-label={`Go to page ${index + 1}`}
              aria-current={currentPage === index ? 'page' : undefined}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Image Loading Overlay */}
      {loadingImage !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-lg">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl text-center">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-[#193358]/10 rounded-full">
                <Image
                  src="/images/logo.png"
                  alt="CHS Logo"
                  width={60}
                  height={60}
                  className="animate-pulse"
                />
              </div>
            </div>
            <p className="text-slate-700 font-semibold">Loading image...</p>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          {/* Close Button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
            aria-label="Close lightbox"
          >
            <X size={32} className="text-white" />
          </button>

          {/* Image Container */}
          <div className="relative w-full max-w-4xl h-auto max-h-[80vh] flex items-center justify-center animate-slide-up">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={displayItems[selectedIndex].image || "/placeholder.svg"}
                alt={displayItems[selectedIndex].alt}
                width={1200}
                height={800}
                className="object-contain max-w-full max-h-[80vh]"
                priority
              />
            </div>
          </div>

          {/* Image Description */}
          <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 text-white">
            <p className="text-lg md:text-xl font-semibold mb-2">
              {displayItems[selectedIndex].description}
            </p>
            <p className="text-sm md:text-base opacity-75">
              Image {selectedIndex + 1} of {displayItems.length}
            </p>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-primary hover:bg-secondary text-white rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} className="md:w-8 md:h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-primary hover:bg-secondary text-white rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight size={24} className="md:w-8 md:h-8" />
          </button>

          {/* Keyboard hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xs md:text-sm opacity-50">
            Use arrow keys to navigate • ESC to close
          </div>
        </div>
      )}
    </section>
  );
}
