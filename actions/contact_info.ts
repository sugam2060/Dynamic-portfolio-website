"use server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

interface SocialLink {
    platform: string;
    url: string;
    icon: string;
    display_name: string;
}

interface ProfessionalLink {
    platform: string;
    url: string;
    icon: string;
    displayName: string;
}

interface ContactResult {
    email: string;
    location: string;
    phone: string;
    address: string;
    timezone: string;
    availability: string;
    socialLinks: Array<{
        platform: string;
        url: string;
        icon: string;
        displayName: string;
    }>;
    professionalLinks: Array<{
        platform: string;
        url: string;
        icon: string;
        displayName: string;
    }>;
    contactFormEnabled: boolean;
    contactFormMessage: string;
    officeHours: string;
    responseTime: string;
}

const get_contact_info = async (): Promise<ContactResult | null> => {
    try {
        const response = await axios.get(`${API_URL}/api/contact-info?populate=*`);
        if(response.status === 200) {
            const data = response.data.data || null;
            if (data) {
                return {
                    email: data.email || '',
                    location: data.location || '',
                    phone: data.phone || '',
                    address: data.address || '',
                    timezone: data.timezone || '',
                    availability: data.availability || '',
                    socialLinks: data.socialLinks?.map((link: SocialLink) => ({
                        platform: link.platform,
                        url: link.url,
                        icon: link.icon,
                        displayName: link.display_name,
                    })) || [],
                    professionalLinks: data.profe?.map((link: ProfessionalLink) => ({
                        platform: link.platform,
                        url: link.url,
                        icon: link.icon,
                        displayName: link.displayName,
                    })) || [],
                    contactFormEnabled: data.contactFormEnabled || false,
                    contactFormMessage: data.contactFormMessage || '',
                    officeHours: data.officeHours || '',
                    responseTime: data.responseTime || '',
                };
            }
            return null;
        }
        return null; // Return null for non-200 status
    } catch {
        return null; // Return null on error
    }
}

export default get_contact_info;
