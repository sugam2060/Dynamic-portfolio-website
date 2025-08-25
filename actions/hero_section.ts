"use server"
import axios from "axios"

const get_hero_section = async () => {
    try {
        const response = await axios.get(`http://localhost:1337/api/hero-section?populate=*`)
        if (response.status === 200) {
            console.log(response.data.data)
            return {
                profile_picture: response.data.data.profile_picture.url,
                title: response.data.data.Title,
                subtitle: response.data.data.subtitle,
                name: response.data.data.name,
            }
        }
        return null; // Return null for non-200 status
    } catch {
        return null; // Return null on error
    }
}

export default get_hero_section