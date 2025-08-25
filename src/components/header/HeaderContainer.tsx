'use client';

import { useState } from 'react';
import Logo from './Logo';
import DesktopNavigation from './DesktopNavigation';
import ResumeButton from './ResumeButton';
import MobileMenuButton from './MobileMenuButton';
import MobileNavigation from './MobileNavigation';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export default function HeaderContainer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container-max">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNavigation navItems={navItems} />

          {/* Resume Button */}
          <div className="hidden md:block">
            <ResumeButton />
          </div>

          {/* Mobile Menu Button */}
          <MobileMenuButton isMenuOpen={isMenuOpen} onToggle={toggleMenu} />
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation 
          navItems={navItems} 
          isMenuOpen={isMenuOpen} 
          onNavClick={toggleMenu} 
        />
      </div>
    </header>
  );
}
