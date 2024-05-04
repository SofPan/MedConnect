import axios from "axios";

export const fetchUser = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/profile/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}