'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronUp, Linkedin, Youtube, Instagram, Facebook } from 'lucide-react';
import {
  SITE_SHORT_NAME,
  TAGLINE_1,
  FOOTER_LINKS,
  SOCIAL_LINKS,
} from '@/lib/constants';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialIcons: any = {
    Linkedin,
    Youtube,
    Instagram,
    Facebook,
  };

  return (
    <>
      {/* Footer */}
      <footer className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          {/* Main Footer Grid - Responsive: 1 col (mobile), 2 cols (tablet md), 4 cols (desktop lg) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-12 md:mb-16">
            {/* Column 1 - Logo & Company Info */}
            <div className="space-y-6">
              {/* Logo */}
              <Link href="#home" className="inline-flex items-center gap-2 group">
                <div className="relative h-10 w-10">
                  <Image
                    src="/images/chs-logo.jpg"
                    alt="CHS Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col gap-0">
                  <span className="text-base font-bold text-primary dark:text-primary">
                    {SITE_SHORT_NAME}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-tight">
                    Health Services
                  </span>
                </div>
              </Link>

              {/* Tagline */}
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {TAGLINE_1}
              </p>

              {/* Social Links */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-black dark:text-white uppercase tracking-wider">
                  Follow Us
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = socialIcons[link.icon];
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 hover:bg-secondary text-primary dark:text-primary hover:text-white transition-all duration-300 hover:scale-110"
                        aria-label={link.name}
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Column 2 - Services */}
            <div className="space-y-3">
              <h4 className="font-semibold text-black dark:text-white text-sm">Services</h4>
              <ul className="space-y-2 text-xs md:text-sm text-slate-600 dark:text-gray-300">
                <li><a href="#services" className="hover:text-primary dark:hover:text-primary transition-colors">Clinical Training</a></li>
                <li><a href="#services" className="hover:text-primary dark:hover:text-primary transition-colors">Quality & Accreditation</a></li>
                <li><a href="#services" className="hover:text-primary dark:hover:text-primary transition-colors">Digital Health</a></li>
              </ul>
            </div>

            {/* Column 3 - Company */}
            <div className="space-y-3">
              <h4 className="font-semibold text-black dark:text-white text-sm">Company</h4>
              <ul className="space-y-2 text-xs md:text-sm text-slate-600 dark:text-gray-300">
                <li><a href="#about" className="hover:text-primary dark:hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#gallery" className="hover:text-primary dark:hover:text-primary transition-colors">Gallery</a></li>
                <li><a href="#clients" className="hover:text-primary dark:hover:text-primary transition-colors">Our Clients</a></li>
                <li><a href="#contact" className="hover:text-primary dark:hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Column 4 - Resources */}
            <div className="space-y-3">
              <h4 className="font-semibold text-black dark:text-white text-sm">Resources</h4>
              <ul className="space-y-2 text-xs md:text-sm text-slate-600 dark:text-gray-300">
                <li><a href="#" className="hover:text-primary dark:hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary dark:hover:text-primary transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-primary dark:hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary dark:hover:text-primary transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-slate-200/0 via-slate-300/50 to-slate-400/0 dark:from-slate-700/0 dark:via-slate-600/50 dark:to-slate-700/0 mb-8 md:mb-10" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            {/* Copyright */}
            <p className="text-xs md:text-sm text-slate-600 dark:text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Chatushtya Health Services LLP. All rights reserved.
            </p>

            {/* Links */}
            <div className="flex gap-4 md:gap-6 text-xs md:text-sm">
              <Link href="#home" className="text-slate-600 dark:text-gray-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <Link href="#home" className="text-slate-600 dark:text-gray-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-secondary transition-all duration-300 hover:scale-110 z-40 font-semibold ${
          isVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>
    </>
  );
}
