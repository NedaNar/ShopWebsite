import { useState, useEffect } from "react";
import axios from "axios";

function useFetch<T>(endpoint: string): T | null {
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
      }
    };

    fetchData();
  }, [endpoint]);

  return data;
}

export default useFetch;
