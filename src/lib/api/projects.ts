// This file demonstrates how to integrate with Strapi CMS
// Replace the hardcoded data in components with API calls

export interface Project {
  id: string;
  attributes: {
    title: string;
    description: string;
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
    featured: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface ProjectsResponse {
  data: Project[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/projects?populate=*&sort=createdAt:desc`,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status}`);
    }

    const data: ProjectsResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Return fallback data if API fails
    return [];
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/projects?populate=*&filters[featured][$eq]=true&sort=createdAt:desc`,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch featured projects: ${response.status}`);
    }

    const data: ProjectsResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/projects?populate=*&filters[slug][$eq]=${slug}`,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.status}`);
    }

    const data: ProjectsResponse = await response.json();
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

// Helper function to format project data for components
export function formatProjectForComponent(project: Project) {
  return {
    id: project.id,
    title: project.attributes.title,
    description: project.attributes.description,
    image: project.attributes.image?.data?.attributes?.url || '/api/placeholder/400/300',
    technologies: project.attributes.technologies || [],
    link: project.attributes.link,
    featured: project.attributes.featured,
  };
}
