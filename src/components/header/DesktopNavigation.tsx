'use client';

import { useState, useEffect } from 'react';

interface NavItem {
  name: string;
  href: string;
}

interface DesktopNavigationProps {
  navItems: NavItem[];
}

export default function DesktopNavigation({ navItems }: DesktopNavigationProps) {
  const [activeSection, setActiveSection] = useState('about');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'skills', 'experience', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    // Smooth scroll to section with offset for fixed header
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 64; // Height of the fixed header (h-16 = 64px)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 20; // Additional 20px padding
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => {
        const sectionId = item.href.substring(1);
        const isActive = activeSection === sectionId;
        
        return (
          <button
            key={item.name}
            onClick={() => handleNavClick(item.href)}
            className={`transition-colors duration-200 bg-transparent border-none cursor-pointer ${
              isActive 
                ? 'text-portfolio-blue font-medium' 
                : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            {item.name}
          </button>
        );
      })}
    </nav>
  );
}
