"use server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

interface ExperienceItem {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    technologies?: Array<{
        technology: string;
    }>;
    achievement?: Array<{
        achievement: string;
    }>;
}

interface ExperienceResult {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    technologies: string[];
    achievements: string[];
}

const get_experience_section = async (): Promise<ExperienceResult[]> => {
    try {
        const response = await axios.get(`${API_URL}/api/experience-sections?populate=*`);
        if(response.status === 200) {
            const data = response.data.data || []
            const result = data.map((item: ExperienceItem): ExperienceResult => {
                return {
                    id: item.id,
                    title: item.title,
                    company: item.company,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    description: item.description,
                    technologies: item.technologies?.map((tech) => tech.technology) || [],
                    achievements: item.achievement?.map((achievement) => achievement.achievement) || [],
                }
            })
            return result;
        }
        return []; // Return empty array for non-200 status
    } catch {
        return []; // Return empty array on error
    }
}


export default get_experience_section;