import axios from "axios";

const API_BASE_URL = "http://localhost:8080/"

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

export const putPatient = async (patient) => {
  try {
    const response = await axios.put(`${API_BASE_URL}patients/${patient.id}`, patient);
    return response;
  } catch (error) {
    console.error("Error editing patient", error);
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

export const deleteRequest = async (requestId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}requests/${requestId}/delete`);
    return response;
  } catch (error) {
    console.error("Error deleting request", error);
    throw error;
  }
}