'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  X,
  Home,
} from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleSectionChange = () => {
      const sections = [
        { id: 'home', offset: 0 },
        { id: 'what-we-do', offset: 500 },
        { id: 'why-choose-us', offset: 1200 },
        { id: 'about', offset: 1800 },
      ];

      const scrollY = window.scrollY;
      let current = 'home';

      for (const section of sections) {
        if (scrollY >= section.offset) {
          current = section.id;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleSectionChange);
    return () => window.removeEventListener('scroll', handleSectionChange);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all mt-2 py-4 duration-500 ${scrolled
        ? 'bg-white/95 shadow-md text-slate-900 border-b border-slate-200'
        : 'bg-white text-slate-900 border-b border-slate-100'
        }`}
    >
      <div className="mx-auto px-3 md:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Extreme Left */}
          <Link
            href="#home"
            className="flex items-center justify-center h-32"
          >
            <div className="relative h-12 w-12 md:h-16 md:w-16 p-0 overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="CHS Logo"
                fill
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col gap-0">
              <div className="font-bold text-lg md:text-xl lg:text-2xl text-primary">CHATUSTHYA</div>
              <div className="font-medium text-sm md:text-base lg:text-lg mr-2 text-primary leading-none">
                HEALTH SERVICES
                <span className="font-medium text-sm md:text-base lg:text-lg ml-2 leading-none">LLP</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`group text-sm xl:text-lg 2xl:text-xl font-semibold px-3 lg:px-4 py-2 transition-all duration-300 rounded-lg relative overflow-hidden flex items-center gap-1.5 ${activeSection === link.href.replace('#', '')
                    ? 'text-primary-hover bg-primary/5'
                    : 'text-primary-hover'
                  }`}
              >
                {link.label === 'Home' && <Home size={20} />}
                <span className="relative z-10">
                  {link.label === 'Home' ? '' : link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Contact Button - Extreme Right */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative bg-primary text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 whitespace-nowrap text-sm px-4 py-2 md:px-6 md:py-3 xl:px-8 xl:py-4 xl:text-base">
              <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Contact Us</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="#home"
              onClick={() => scrollToSection('#home')}
              className="p-2.5 text-primary hover:bg-primary/5 rounded-lg transition-all duration-300 active:scale-95"
              aria-label="Home"
            >
              <Home size={24} />
            </Link>
            <button
              className="p-2.5 text-primary hover:bg-primary/5 rounded-lg transition-all duration-300 active:scale-95"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Modern Slide Animation */}
        {isOpen && (
          <div className="lg:hidden pb-4 bg-white border-t border-slate-200 animate-slide-up">
            <div className="py-3 space-y-2 px-4">
              {NAV_LINKS.filter((link) => link.label !== 'Home').map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    scrollToSection(link.href);
                    setIsOpen(false);
                  }}
                  className="group flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300"
                >
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Contact Button */}
            <div className="py-3 mt-3 border-t border-white/10">
              <button
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 bg-primary text-white font-semibold rounded-lg text-center hover:bg-secondary hover:text-white transition-all duration-300 active:scale-95 text-sm shadow-md"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
