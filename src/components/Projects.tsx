import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import get_project_section from '../../actions/project_section';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, GithubIcon } from 'lucide-react';
import { get_project_heading } from '../../actions/Headings_class';

// This interface matches the ProjectResult from the action
interface Project {
  id: string;
  project_title: string;
  project_description: string;
  project_image: string;
  technologies: string[];
  live_link?: string;
  github_link?: string;
}

export default async function Projects() {
  const projects = await get_project_section();
  const projectHeading = await get_project_heading();

  // Don't display component if no projects data
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="section-padding bg-muted/20">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            PROJECTS
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {projectHeading || "Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Project) => (
            <Card
              key={project.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                {/* Project Image */}
                <div className="w-full h-48 relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.project_image}`}
                    alt="project image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Link Icons */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    {project.live_link && (
                      <Link
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                        title="View Live Project"
                      >
                        <ExternalLink size={16} />
                      </Link>
                    )}
                    {project.github_link && (
                      <Link
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2  bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                        title="View Source Code"
                      >
                        <GithubIcon size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-portfolio-blue transition-colors">
                  {project.project_title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-foreground/70 mb-4 leading-relaxed line-clamp-3">
                  {project.project_description}
                </CardDescription>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-portfolio-blue/10 text-portfolio-blue text-sm rounded-full border border-portfolio-blue/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
