import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8080/";

// accepts a request url (required) and id (optional)
export const useGet = (query, id) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${API_BASE_URL}${query}/${id ? id : ""}`);

        setData(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user", error);
        throw error;
      }

    }

    fetchData();
  }, [query, id]);

  return { loading, data };
}

export const usePost = (query, payload) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const postData = async () => {
      try {
        setLoading(true);

        const response = await axios.post(`${API_BASE_URL}${query}/${payload.id ? payload.id : ""}`, payload);

        setData(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user", error);
        throw error;
      }

    }

    postData();
  }, [query, payload]);

  return { loading, data };
}