# Strapi Setup Guide for Portfolio CMS

## Overview

This guide will help you set up Strapi CMS to manage your portfolio content dynamically. The Projects schema matches your `Projects.tsx` component interface and provides additional fields for comprehensive project management.

## Prerequisites

- Node.js 18+ installed
- Basic knowledge of Strapi CMS
- Your portfolio project ready for integration

## Step 1: Create Strapi Project

```bash
# Create new Strapi project
npx create-strapi-app@latest portfolio-cms --quickstart

# Or if you want to use existing project
cd portfolio-cms
```

## Step 2: Import Projects Schema

### Option A: Manual Creation (Recommended for learning)

1. **Open Strapi Admin Panel**
   - Navigate to `http://localhost:1337/admin`
   - Create your admin account

2. **Create Content Type**
   - Go to **Content-Type Builder** → **Create new collection type**
   - Name: `Project`
   - API ID: `project`

3. **Add Fields** (based on the schema):

   #### Basic Fields
   - **Title** (Text, Short text, Required, Unique)
   - **Description** (Text, Long text, Required)
   - **Short Description** (Text, Short text)
   - **Slug** (UID, Target: Title, Required, Unique)

   #### Media & Links
   - **Image** (Media, Single media, Images only)
   - **Link** (Text, Short text, URL format)
   - **GitHub Link** (Text, Short text, URL format)

   #### Technologies & Categories
   - **Technologies** (JSON, Required)
   - **Tags** (JSON)
   - **Project Type** (Enumeration: web-app, mobile-app, desktop-app, api, library, other)
   - **Difficulty** (Enumeration: beginner, intermediate, advanced, expert)

   #### Project Details
   - **Featured** (Boolean, Default: false)
   - **Order** (Number, Integer, Default: 0)
   - **Status** (Enumeration: draft, published, archived, Default: draft)
   - **Duration** (Text, Short text)
   - **Team Size** (Number, Integer, Min: 1)

   #### Additional Information
   - **Start Date** (Date)
   - **End Date** (Date)
   - **Challenges** (Text, Long text)
   - **Learnings** (Text, Long text)

4. **Save and Restart**
   - Click **Save**
   - Restart your Strapi server

### Option B: Import Schema File

1. **Copy Schema File**
   - Copy `strapi-schemas/projects.json` to your Strapi project
   - Place it in `src/api/project/content-types/project/schema.json`

2. **Restart Strapi**
   ```bash
   npm run develop
   ```

## Step 3: Configure Permissions

1. **Go to Settings** → **Users & Permissions plugin** → **Roles**
2. **Select Public role**
3. **Enable permissions for Projects:**
   - `find` - Allow public to view projects
   - `findOne` - Allow public to view individual projects
4. **Save**

## Step 4: Add Sample Data

### Example Project Entry

```json
{
  "title": "E-commerce Platform",
  "description": "A full-featured e-commerce platform with user authentication, product management, and payment integration.",
  "shortDescription": "Full-featured e-commerce platform with modern tech stack",
  "slug": "ecommerce-platform",
  "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
  "link": "https://your-project-demo.com",
  "githubLink": "https://github.com/yourusername/ecommerce-platform",
  "featured": true,
  "order": 1,
  "status": "published",
  "projectType": "web-app",
  "difficulty": "advanced",
  "duration": "3 months",
  "teamSize": 1,
  "challenges": "Implementing real-time payment processing and ensuring security compliance",
  "learnings": "Advanced state management, payment gateway integration, and security best practices",
  "tags": ["e-commerce", "full-stack", "payment-processing"],
  "startDate": "2024-01-01",
  "endDate": "2024-04-01"
}
```

## Step 5: Update Your Portfolio Components

### Update Projects.tsx

```tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

// Updated interface to match Strapi schema
interface Project {
  id: string;
  attributes: {
    title: string;
    description: string;
    shortDescription?: string;
    slug: string;
    image?: {
      data: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    technologies: string[];
    link?: string;
    githubLink?: string;
    featured: boolean;
    order: number;
    status: string;
    projectType: string;
    difficulty: string;
    duration?: string;
    teamSize?: number;
    challenges?: string;
    learnings?: string;
    tags?: string[];
    publishedAt: string;
    startDate?: string;
    endDate?: string;
  };
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?populate=*&sort=order:asc&filters[status][$eq]=published`);
        const data = await response.json();
        setProjects(data.data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to static data
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="section-padding bg-muted/20">
        <div className="container-max">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-portfolio-blue mx-auto"></div>
            <p className="mt-4 text-foreground/70">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding bg-muted/20">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Projects</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-t-lg">
                {project.attributes.image?.data ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.attributes.image.data.attributes.url}`}
                    alt={project.attributes.image.data.attributes.alternativeText || project.attributes.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-portfolio-blue/20 to-blue-400/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-portfolio-blue/30 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-8 h-8 text-portfolio-blue" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                          <path d="M14 2v6h6"/>
                        </svg>
                      </div>
                      <p className="text-sm text-foreground/60">Project Preview</p>
                    </div>
                  </div>
                )}
                
                {project.attributes.featured && (
                  <div className="absolute top-2 right-2 bg-portfolio-blue text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-portfolio-blue transition-colors">
                  {project.attributes.title}
                </CardTitle>
                {project.attributes.difficulty && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-foreground/60">Difficulty:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.attributes.difficulty === 'expert' ? 'bg-red-500/20 text-red-400' :
                      project.attributes.difficulty === 'advanced' ? 'bg-orange-500/20 text-orange-400' :
                      project.attributes.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {project.attributes.difficulty}
                    </span>
                  </div>
                )}
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-foreground/70 mb-4 leading-relaxed">
                  {project.attributes.shortDescription || project.attributes.description}
                </CardDescription>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.attributes.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-portfolio-blue/10 text-portfolio-blue text-sm rounded-full border border-portfolio-blue/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  {project.attributes.link && (
                    <a
                      href={project.attributes.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-portfolio-blue text-white text-center py-2 px-4 rounded-md hover:bg-portfolio-blue/90 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.attributes.githubLink && (
                    <a
                      href={project.attributes.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-800 text-white text-center py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Step 6: Environment Variables

Create `.env.local` in your portfolio project:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token_here
```

## Step 7: API Integration

### Create API Service

```typescript
// src/lib/api/projects.ts
export async function getProjects() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?populate=*&sort=order:asc&filters[status][$eq]=published`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getFeaturedProjects() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/projects?populate=*&filters[featured][$eq]=true&filters[status][$eq]=published&sort=order:asc`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch featured projects: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}
```

## Benefits of This Schema

### **Content Management**
- **Easy Updates**: Change project details without touching code
- **Rich Content**: Add images, links, and detailed descriptions
- **Workflow Control**: Draft → Review → Publish workflow

### **Enhanced Features**
- **Featured Projects**: Highlight your best work
- **Ordering**: Control project display sequence
- **Categorization**: Organize by type, difficulty, and tags
- **Rich Metadata**: Track duration, team size, challenges, and learnings

### **Future Extensibility**
- **Project Details Pages**: Use slug for individual project pages
- **Filtering**: Filter by technology, difficulty, or type
- **Search**: Implement project search functionality
- **Analytics**: Track project views and engagement

## Next Steps

1. **Set up Strapi** with the Projects schema
2. **Add your projects** through the admin panel
3. **Update your components** to fetch from Strapi
4. **Test the integration** and refine as needed
5. **Deploy both projects** (Strapi CMS + Portfolio)

This setup gives you a professional, scalable content management system for your portfolio that you can easily maintain and extend!
