const app = require("./app");
const socket = require("socket.io");


const PORT = 3002;

const server = app.listen("3002", () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});

const io = socket(server);

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log("User Joined Room: " + data);
    });

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data.content);
    });

    socket.on("disconnect", () => {
        console.log("USER DISCONNECTED");
    });
});

