import axios from "axios";

const API_BASE_URL = "http://localhost:8080/"
const POST_HEADER = {
  headers: {
    "Content-type": "application/x-www-form-urlencoded"
  }
}

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

export const fetchPatientAppointments = async (patientId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}appointments/patients/${patientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient's appointments", error);
    throw error;
  }
}

export const fetchClinicsOpenAppointments = async (doctorId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}appointments/open/${doctorId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient's appointments", error);
    throw error;
  }
}

export const fetchRequestNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}requests`);
    return response.data;
  } catch (error) {
    console.error("Error fetching requests", error);
    throw error;
  }
}

export const postDoctor = async (doctor) => {
  try {
    console.log("2 tempUseAPI post")
    const response = await axios.post(`${API_BASE_URL}doctors`, doctor, POST_HEADER);
    console.log("? tempUseAPI after post")
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

export const postRequest = async (request) => {
  try {
    const response = await axios.post(`${API_BASE_URL}requests`, request);
    return response;
  } catch (error) {
    console.error("Error posting new pending request", error);
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

export const putAppointment = async (appointment) => {
  try {
    const response = await axios.put(`${API_BASE_URL}appointments/${appointment.id}`, appointment);
    return response;
  } catch (error) {
    console.error("Error editing appointment", error);
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