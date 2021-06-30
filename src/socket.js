const socket = require("socket.io");
const Message = require("./models/Message");
const server = require("./server");

const io = socket(server);

io.on("connection", async (socket) => {
    console.log(socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log("User Joined Room: " + data);
    });

    socket.on("send_message", async (data) => {
            const message = await Message.create({
                message: data.message,
                userId: data.userId,
                groupId: data.groupId,
                chatId: data.chatId,
                createdAt: data.createdAt,
            });
            socket.to(data.chatId).emit("receive_message", data.id = message.id);
            console.log(data)
    });

    socket.on("disconnect", () => {
        console.log("USER DISCONNECTED");
    });

    socket.on("delete_message", async (data) => {
        console.log(data.chatId)

        const message = await Message.findOne({
            where: {
                id : data.id,
                userId : data.userId
            }
        });

        if(!message)
            return ({ error: "Mensagem não encontrada"})
        message.destroy();
        socket.to(data.chatId).emit("message_delete", "sua mensagem foi deletada");
    })
});

module.exports = io;