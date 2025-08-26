"use server"
import axios from "axios"


const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface ProjectItem {
    id: string;
    project_title: string;
    project_short_description: string;
    project_image?: {
        url: string;
    };
    technologies: Array<{
        id: string;
        technology: string;
    }>;
    live_link?: string;
    github_link?: string;
}

interface ProjectResult {
    id: string;
    project_title: string;
    project_description: string;
    project_image: string;
    technologies: string[];
    live_link: string;
    github_link: string;
}

const get_project_section = async (): Promise<ProjectResult[]> => {
    try {
        const response = await axios.get(`${API_URL}/api/projects-sections?populate=*`)
        if (response.status === 200) {
            const data = response.data.data
            const projects = (data ?? []).map((project: ProjectItem): ProjectResult => ({
                id: project.id,
                project_title: project.project_title,
                project_description: project.project_short_description,
                project_image: project.project_image?.url ?? '',
                technologies: project.technologies?.map(tech => tech.technology) ?? [],
                live_link: project.live_link ?? '',
                github_link: project.github_link ?? '',
            }));
            return projects
        }
        return []; // Return empty array for non-200 status
    } catch {
        return []; // Return empty array on error
    }
}

export default get_project_section