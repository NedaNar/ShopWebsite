import { toast, ToastContent } from "react-toastify";

export const toastSuccess = (message: ToastContent) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 2000,
  });
};

export const toastError = () => {
  toast.error(`Error! Please try again later.`, {
    position: "top-center",
    autoClose: 2000,
  });
};

export const toastInfo = (message: string) => {
  toast.info(message, {
    position: "top-center",
    autoClose: 2000,
  });
};
