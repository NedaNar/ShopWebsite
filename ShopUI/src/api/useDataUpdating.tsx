import { useState } from "react";
import axios from "axios";

interface PutResult<T> {
  responseData: T | null;
  error: boolean;
  updateData: (data: T, endpoint: string) => void;
}

function useUpdate<T>(): PutResult<T> {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [error, setError] = useState(false);

  const updateData = async (data: T, endpoint: string) => {
    try {
      const url = `https://localhost:7265/api/${endpoint}`;
      const response = await axios.put<T>(url, data);

      if (
        response.status === 201 ||
        response.status === 204 ||
        response.status === 200
      ) {
        setResponseData(response.data);
      } else {
        setError(true);
      }
    } catch (putError) {
      setError(true);
    } finally {
    }
  };

  return { responseData, error, updateData };
}

export default useUpdate;
