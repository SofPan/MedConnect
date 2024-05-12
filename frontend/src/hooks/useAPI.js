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

export const usePost = () => {
  const [postLoading, setPostLoading] = useState(false);
  const [postData, setPostData] = useState(null);

  const post = async (query, payload) => {
    try {
      setPostLoading(true);

      const response = await axios.post(`${API_BASE_URL}${query}/${payload.id ? payload.id : ""}`, payload);

      setPostData(response.data);

      setPostLoading(false);
    } catch (error) {
      console.error("Error fetching user", error);
      throw error;
    }

  }


  return { postLoading, postData, post };
}

export const usePut = () => {
  const [putLoading, setPutLoading] = useState(false);
  const [putData, setPutData] = useState(null);

  const put = async (query, payload) => {
    try {
      setPutLoading(true);

      const response = await axios.put(`${API_BASE_URL}${query}/${payload.id ? payload.id : ""}`, payload);

      setPutData(response.data);

      setPutLoading(false);
    } catch (error) {
      console.error("Error fetching user", error);
      throw error;
    }

  }


  return { putLoading, putData, put };
}