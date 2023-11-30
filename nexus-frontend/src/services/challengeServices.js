import axios from "axios";
import { jwtDecode } from "jwt-decode";

const apiKey = import.meta.env.VITE_API_KEY;
const backendUrl = import.meta.env.VITE_BACKEND_URI || "http://localhost:5001";

export async function fetchChallengesData() {
  try {
    const response = await axios.get(`${backendUrl}/api/contests`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching challenges data:", error.message);
    return null;
  }
}
