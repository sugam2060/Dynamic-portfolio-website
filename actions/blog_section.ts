"use server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface BlogItem {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    publishedAt: string;
    readTime: string;
    slug: string;
    blog_image?: {
        url: string;
    };
    tags?: Array<{
        tag: string;
    }>;
}

interface BlogResult {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    publishedAt: string;
    readTime: string;
    slug: string;
    featuredImage: string;
    tags: string[];
}

const get_blog_section = async (): Promise<BlogResult[]> => {
    try {
        const response = await axios.get(`${API_URL}/api/blogs?populate=*`);
        if(response.status === 200) {
            const data = response.data.data || []
            const result = data.map((item: BlogItem): BlogResult => {
                return {
                    id: item.id,
                    title: item.title,
                    excerpt: item.excerpt,
                    content: item.content,
                    publishedAt: item.publishedAt,
                    readTime: item.readTime,
                    slug: item.slug,
                    featuredImage: item.blog_image?.url || '',
                    tags: item.tags?.map((tag) => tag.tag) || [],
                }
            })
            return result;
        }
        return []; // Return empty array for non-200 status
    } catch {
        return []; // Return empty array on error
    }
}

export default get_blog_section;