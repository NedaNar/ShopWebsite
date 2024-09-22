import { useState, useEffect } from "react";
import axios from "axios";
import { Endpoint } from "./endpoints";

function useFetch<T>(endpoint: Endpoint): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://localhost:7265/api/${endpoint}`;
        const response = await axios.get<T>(url);
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("fetch completed");
      }
    };

    fetchData();
  }, [endpoint]);

  return data;
}

export default useFetch;
