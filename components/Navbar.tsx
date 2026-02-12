'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  X,
  ChevronDown,
  Zap,
  Home,
} from 'lucide-react';
import { NAV_LINKS, NAV_LINKS_DROPDOWN } from '@/lib/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    setIsDropdownOpen(false);
    // Smooth scroll handling will be delegated to the link
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled
        ? 'bg-white/95 shadow-md text-slate-900 border-b border-slate-200'
        : 'bg-white text-slate-900 border-b border-slate-100'
        }`}
    >
      <div className=" mx-auto px-3 md:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Extreme Left */}
          <Link
            href="#home"
            className="flex items-center justify-center h-32"
          >
            <div className="relative h-24 w-16 p-0 overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="CHS Logo"
                width={20}
                height={20}
                className="w-full h-full object-cover"
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

          {/* Center Links - Hidden on mobile, visible on md+ */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 justify-center">
            {NAV_LINKS.map((link) => {
              const isAboutLink = link.label === 'About Us';

              return isAboutLink ? (
                <div key={link.label} className="relative group">
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold transition-all duration-300 rounded-lg relative overflow-hidden flex items-center gap-1.5 ${activeSection === link.href.replace('#', '')
                      ? 'text-[#193358] bg-[#193358]/5'
                      : 'text-slate-700 hover:text-[#193358]'
                      }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown size={14} className="transition-transform group-hover:rotate-180 duration-300" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#A7833F] rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute left-0 mt-0 w-48 bg-white border border-[#193358]/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-50">
                    {NAV_LINKS_DROPDOWN.map((subLink) => (
                      <Link
                        key={subLink.label}
                        href={subLink.href}
                        onClick={() => scrollToSection(subLink.href)}
                        className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#193358]/5 hover:text-[#193358] transition-all duration-300"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>

                  {/* Animated Arrow Indicator */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronDown size={16} className="text-[#A7833F] animate-bounce" />
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`group px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold transition-all duration-300 rounded-lg relative overflow-hidden flex items-center gap-1.5 ${activeSection === link.href.replace('#', '')
                    ? 'text-[#193358] bg-[#193358]/5'
                    : 'text-slate-700 hover:text-[#193358]'
                    }`}
                >
                  {link.label === 'Home' && <Home size={16} />}
                  <span className="relative z-10">{link.label === 'Home' ? '' : link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Contact Button - Extreme Right */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden md:block group relative px-6 lg:px-7 py-2.5 bg-[#193358] text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 text-xs lg:text-sm whitespace-nowrap"
            >
              <div className="absolute inset-0 bg-[#A7833F] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Contact Us</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 text-[#193358] hover:bg-[#193358]/5 rounded-lg transition-all duration-300 active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Modern Slide Animation */}
        {isOpen && (
          <div className="md:hidden pb-4 bg-white border-t border-slate-200 animate-slide-up">
            <div className="py-3 space-y-2 px-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    scrollToSection(link.href);
                    setIsOpen(false);
                  }}
                  className="group flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:text-[#193358] hover:bg-[#193358]/5 rounded-lg transition-all duration-300"
                >
                  {link.label === 'Home' && <Home size={18} />}
                  <span>{link.label === 'Home' ? '' : link.label}</span>
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
                className="w-full px-4 py-3 bg-[#193358] text-white font-semibold rounded-lg text-center hover:bg-[#A7833F] hover:text-white transition-all duration-300 active:scale-95 text-sm shadow-md"
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
