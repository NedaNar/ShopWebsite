import axios from "axios";
import { toastError, toastSuccess } from "../utils/toastUtils";
interface DeleteResult {
  deleteData: (endpoint: string) => void;
}

function useDelete<T>(): DeleteResult {
  const deleteData = async (endpoint: string) => {
    try {
      const url = `https://localhost:7265/api/${endpoint}`;
      const response = await axios.delete<T>(url);

      if (response.status === 204) {
        toastSuccess("Review deleted");
      }
    } catch (postError) {
      toastError();
    } finally {
    }
  };

  return { deleteData };
}

export default useDelete;
