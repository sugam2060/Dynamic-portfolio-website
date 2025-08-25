'use client';

export default function Logo() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
    >
      <div className="w-6 h-6 bg-portfolio-blue rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-bold">★</span>
      </div>
      <span className="text-xl font-bold text-foreground">Tech Portfolio</span>
    </button>
  );
}
