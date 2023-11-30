import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:5001";

export async function fetchAnnouncementsData() {
  try {
    const response = await axios.get(`${backendUrl}/api/announcements`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching announcements data:", error.message);
    return null;
  }
}
