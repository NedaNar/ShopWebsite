import axios from "axios";
import { toastError, toastSuccess } from "../utils/toastUtils";
import { useState } from "react";
interface DeleteResult {
  deleteData: (endpoint: string) => void;
  deleted: boolean;
}

function useDelete<T>(): DeleteResult {
  const [deleted, setDeleted] = useState(false);

  const deleteData = async (endpoint: string) => {
    try {
      const url = `https://localhost:7265/api/${endpoint}`;
      const response = await axios.delete<T>(url);

      if (response.status === 204) {
        toastSuccess("Deleted!");
        setDeleted(true);
      }
    } catch (postError) {
      toastError();
    } finally {
    }
  };

  return { deleteData, deleted };
}

export default useDelete;
