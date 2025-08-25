"use server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

interface SkillItem {
    id: string;
    name: string;
    category: string;
    proficiency: string;
}

interface SkillResult {
    id: string;
    name: string;
    category: string;
    proficiency: string;
}

const get_skills_section = async (): Promise<SkillResult[]> => {
    try {
        const response = await axios.get(`${API_URL}/api/skills-sections?populate=*`);
        if(response.status === 200) {
            const data = response.data.data || []
            const result = data.map((item: SkillItem): SkillResult => {
                return {
                    id: item.id,
                    name: item.name,
                    category: item.category,
                    proficiency: item.proficiency,
                }
            })
            return result;
        }
        return []; // Return empty array for non-200 status
    } catch {
        return []; // Return empty array on error
    }
}


export default get_skills_section;