"use server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

interface Keyword {
    name: string;
}

interface Author {
    name: string;
}

interface MetadataResult {
    title: string;
    description: string;
    keywords: string[];
    authors: string[];
    creator: string;
}

const get_metadata_section = async (): Promise<MetadataResult | null> => {
  try {
    const response = await axios.get(`${API_URL}/api/metadata?populate=*`);
    if (response.status === 200) {
      const data = response.data.data;      
      // Check if data exists and has required properties
      if (!data || !data.title || !data.description) {
        return null;
      }
      
      const result: MetadataResult = {
        title: data.title || "Portfolio",
        description: data.description || "Full stack developer portfolio",
        keywords: data.keywords?.map((kw: Keyword) => kw.name) || [],
        authors: data.authors?.map((author: Author) => author.name) || [],
        creator: data.creator || "Developer",
      };
      return result;
    }
    return null;
  } catch {
    return null;
  }
};

export default get_metadata_section;
