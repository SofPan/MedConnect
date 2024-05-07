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

export const fetchDocuments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}documents`);
    return response.data;
  } catch (error) {
    console.error("Error fetching documents", error);
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

export const postDocument = async (document) => {
  try {
    const response = await axios.post(`${API_BASE_URL}documents`, document);
    return response;
  } catch (error) {
    console.error("Error posting new document", error);
    throw error;
  }
}

export const putDoctor = async (doctor) => {
  try {
    const response = await axios.put(`${API_BASE_URL}doctors/${doctor.id}`, doctor);
    return response;
  } catch (error) {
    console.error("Error editing doctor", error);
    throw error;
  }
}

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