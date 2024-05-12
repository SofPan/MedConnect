import axios from "axios";

const API_BASE_URL = "http://localhost:8080/"

export const deleteDoctor = async (doctorId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}doctors/${doctorId}/delete`);
    return response;
  } catch (error) {
    console.error("Error deleting doctor", error);
    throw error;
  }
}

export const deleteDocument = async (documentId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}documents/${documentId}/delete`);
    return response;
  } catch (error) {
    console.error("Error deleting document", error);
    throw error;
  }
}

export const deleteRequest = async (requestId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}requests/${requestId}/delete`);
    return response;
  } catch (error) {
    console.error("Error deleting request", error);
    throw error;
  }
}