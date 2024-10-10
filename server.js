import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);
  io.on("connection", (socket) => {
    socket.on("message", async (prompt) => {
      try {
        // Uncomment this for weather map api
        // const response = await fetch("http://localhost:3000/api/chatbot", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ message }),
        // });
        const response = await fetch("http://localhost:3000/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ body: prompt }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reply from chatbot");
        }

        const { output } = await response.json();
        socket.emit("response", output);
      } catch (error) {
        socket.emit("response", "There was an error processing your request.");
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
