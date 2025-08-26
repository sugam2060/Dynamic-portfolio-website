

import Image from 'next/image';
import get_hero_section from '../../actions/hero_section';

export default async function Hero() {
  const heroData = await get_hero_section();
  
  if (!heroData) {
    // Show dummy fields until real data arrives
    return (
      <section id="about" className="section-padding pt-24">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Profile Image */}
            <div className="flex justify-center md:justify-start">
              <div className="relative w-80 h-80">
                {/* Profile Image */}
                <div className="mt-5 relative w-full h-full rounded-full overflow-hidden border-4 border-portfolio-blue/20 shadow-2xl bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">Profile Image</span>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-portfolio-blue rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                  </svg>
                </div>
                
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-r from-portfolio-blue to-blue-400 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Right side - Text content */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Hi, I&apos;m 
                <span className="text-gradient"> Developer</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
                Full Stack Developer building scalable web applications with a focus on user experience
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { profile_picture, title, subtitle, name } = heroData;
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  return (
    <section id="about" className="section-padding pt-24">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Profile Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-80 h-80">
              {/* Profile Image */}
              <div className="mt-5 relative w-full h-full rounded-full overflow-hidden border-4 border-portfolio-blue/20 shadow-2xl">
                <Image
                  src={`${strapiUrl}${profile_picture}`}
                  alt="Alex Chen - Full Stack Developer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 320px, 320px"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-portfolio-blue rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                </svg>
              </div>
              
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-r from-portfolio-blue to-blue-400 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {title} 
              <span className="text-gradient">{` ${name}`}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
