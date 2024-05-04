import axios from "axios";

const API_BASE_URL = "http://localhost:8080/"

export const fetchUser = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}profile/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}

export const fetchDoctors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}doctors`);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors", error);
    throw error;
  }
}

export const postDoctor = async (doctor) => {
  try {
    const response = await axios.post(`${API_BASE_URL}doctors`, doctor);
    return response;
  } catch (error) {
    console.error("Error posting new doctor", error);
    throw error;
  }
}