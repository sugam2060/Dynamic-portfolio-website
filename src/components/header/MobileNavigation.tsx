'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import get_resume from '../../../actions/get_resume';

interface NavItem {
  name: string;
  href: string;
}

interface MobileNavigationProps {
  navItems: NavItem[];
  isMenuOpen: boolean;
  onNavClick: () => void;
}

export default function MobileNavigation({ navItems, isMenuOpen, onNavClick }: MobileNavigationProps) {
  const [activeSection, setActiveSection] = useState('about');
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  // Fetch resume URL on component mount
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const url = await get_resume();
        setResumeUrl(url);
      } catch {
        // Error fetching resume
      }
    };

    fetchResume();
  }, []);

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
    // Close mobile menu
    onNavClick();
    
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

  const handleResumeClick = () => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0'
      }`}
    >
      <div className="py-4 border-t border-border">
        <nav className="flex flex-col items-center space-y-4">
          {navItems.map((item) => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;
            
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`transition-colors duration-200 bg-transparent border-none cursor-pointer text-center ${
                  isActive 
                    ? 'text-portfolio-blue font-medium' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {item.name}
              </button>
            );
          })}
          <Button 
            className="bg-portfolio-blue hover:bg-portfolio-blue/90 w-full max-w-xs"
            onClick={handleResumeClick}
            disabled={!resumeUrl}
          >
            Resume
          </Button>
        </nav>
      </div>
    </div>
  );
}
