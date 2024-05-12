import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8080/";

// accepts a request url (required) and id (optional)
export const useGet = (query, id) => {
  console.log("id", id);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${API_BASE_URL}${query}/${id && id}`);

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