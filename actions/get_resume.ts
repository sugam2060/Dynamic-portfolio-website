"use server"
import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;


const get_resume = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/resume?populate=*`);
        if(response.status === 200) {
            const data = response.data.data;
            // For single type, data is directly accessible
            if (data && data.url) {
                return data.url;
            }
            return null;
        }
        return null;
      } catch {
    return null;
  }
}

export default get_resume;