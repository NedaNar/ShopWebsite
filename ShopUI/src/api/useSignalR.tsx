import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";

interface UseSignalROptions {
  onReceiveNotification: (message: string) => void;
}

const useSignalR = ({ onReceiveNotification }: UseSignalROptions) => {
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7265/notificationHub")
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveNotification", (message: string) => {
      onReceiveNotification(message);
    });

    connection
      .start()
      .then(() => console.log("Connected to SignalR hub"))
      .catch((err) => console.error("Error connecting to SignalR hub:", err));

    return () => {
      connection
        .stop()
        .then(() => console.log("Disconnected from SignalR hub"));
    };
  }, [onReceiveNotification]);
};

export default useSignalR;
