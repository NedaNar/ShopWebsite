import { toast, ToastContent } from "react-toastify";

export const toastSuccess = (message: ToastContent) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
  });
};

export const toastError = (message: string) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
  });
};

export const toastInfo = (message: string) => {
  toast.info(message, {
    position: "top-center",
    autoClose: 3000,
  });
};