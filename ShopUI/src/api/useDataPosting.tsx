import { useState } from "react";
import axios from "axios";
import { Endpoint } from "./endpoints";

interface PostResult<T> {
  responseData: T | null;
  postData: (data: T) => void;
}

function usePost<T>(endpoint: Endpoint): PostResult<T> {
  const [responseData, setResponseData] = useState<T | null>(null);

  const postData = async (data: T) => {
    try {
      const url = `https://localhost:7265/api/${endpoint}`;
      const response = await axios.post<T>(url, data);
      setResponseData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return { responseData, postData };
}

export default usePost;
