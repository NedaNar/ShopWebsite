import { useState, useEffect } from "react";
import axios from "axios";

function useFetch<T>(endpoint: string): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://localhost:7265/api/${endpoint}`;
        console.log(url);
        const response = await axios.get<T>(url);
        console.log(response);
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
