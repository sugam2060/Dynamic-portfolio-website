"use server"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function get_project_heading() {
    try {
        const response = await axios.get(`${API_URL}/api/project-heading?populate=*`);
        if(response.status === 200) {
            const data = response.data.data;
            
            if (data && data.Heading) {
                return data.Heading
            }
            return null;
        }
        return null;
      } catch {
    return null;
  }
}

export async function get_experience_heading() {
    try {
        const response = await axios.get(`${API_URL}/api/experience-heading?populate=*`);
        if(response.status === 200) {
            const data = response.data.data;
            if(data && data.Heading) {
                return data.Heading;
            }
            return null;
        }
        return null;
    } catch {
        return null;
    }
}


export async function get_skills_heading() {
    try {
        const response = await axios.get(`${API_URL}/api/skill-heading?populate=*`);
        if(response.status === 200) {
            const data = response.data.data;
            if(data && data.Heading) {
                return data.Heading;
            }
            return null;
        }
        return null;
    } catch {
        return null;
    }
}

export async function get_blog_heading() {
    try {
        const response = await axios.get(`${API_URL}/api/blog-heading?populate=*`);
        if(response.status === 200) {
            const data = response.data.data;
            if(data && data.Heading) {
                return data.Heading;
            }
            return null;
        }
        return null;
    } catch {
        return null;
    }
}


export async function get_footer_heading() {
    try {
        const response = await axios.get(`${API_URL}/api/footer?populate=*`);
        if(response.status === 200) {
            const data = response.data.data;
            if(data && data.copyright) {
                return data.copyright;
            }
            return null;
        }
        return null;
    } catch {
        return null;
    }
}

