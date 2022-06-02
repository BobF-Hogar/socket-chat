const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = 3001;

io.on("connection", (socket) => {
  socket.on("message", function (message) {
    setTimeout(() => {socket.broadcast.emit("message", message);}, 1000);
  });
});

http.listen(PORT, () => {
  console.log(`Socket server listening on port ${PORT}`);
});
