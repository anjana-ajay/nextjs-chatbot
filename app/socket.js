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
