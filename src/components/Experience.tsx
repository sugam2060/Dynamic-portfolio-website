import get_experience_section from "../../actions/experience_section";
import { get_experience_heading } from "../../actions/Headings_class";

// This interface will be useful when integrating with Strapi
interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export default async function Experience() {

  const experiences: Experience[] = await get_experience_section()
  const experienceHeading = await get_experience_heading()

  // Don't render component if no experiences data
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="section-padding bg-muted/20">
      <div className="container-max">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Experience</h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-4">
            {experienceHeading || "My professional journey in software development, from junior developer to software engineer."}
          </p>  
        </div>

        <div className="space-y-8 md:space-y-12">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="relative">
              {/* Timeline connector */}
              {index < experiences.length - 1 && (
                <div className="absolute left-6 md:left-8 top-12 md:top-16 w-0.5 h-8 md:h-12 bg-portfolio-blue/30"></div>
              )}
              
              <div className="flex items-start space-x-4 md:space-x-6">
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-portfolio-blue rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-2 space-y-1 sm:space-y-0">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">{experience.title}</h3>
                    <span className="text-portfolio-blue font-semibold text-sm md:text-base">@ {experience.company}</span>
                  </div>
                  
                  <div className="text-foreground/60 mb-3 md:mb-4 text-sm md:text-base">
                    {experience.startDate} - {experience.endDate}
                  </div>
                  
                  <p className="text-foreground/80 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                    {experience.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                    {experience.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 md:px-3 py-1 bg-portfolio-blue/10 text-portfolio-blue text-xs md:text-sm rounded-full border border-portfolio-blue/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Achievements */}
                  <ul className="space-y-1 md:space-y-2">
                    {experience.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-portfolio-blue mt-1 text-sm md:text-base">•</span>
                        <span className="text-foreground/70 text-sm md:text-base leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
