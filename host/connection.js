const connection = (socket) => {
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
};
export default connection;
