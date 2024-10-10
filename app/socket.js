"use client";

import { io } from "socket.io-client";

export const socket = io();

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Socket disconnected:", socket.id);
});

socket.on("response", (message) => {
  console.log("Received response:", message);
});

// socket.on("connection", (socket1) => {
//   console.log("Client connected:", socket.id);

//   socket1.on("message", async (message) => {
//     console.log("Received message from client:", message);

//     try {
//       const response = await fetch("http://localhost:3000/api/chatbot", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch reply from chatbot");
//       }

//       const { reply } = await response.json();
//       socket1.emit("response", reply); // Send the response back to the client
//     } catch (error) {
//       console.error("Error fetching chatbot response:", error);
//       socket1.emit(
//         "response",
//         "Error occurred while processing your message."
//       );
//     }
//   });

//   socket1.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });
