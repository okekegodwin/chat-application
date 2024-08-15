require("dotenv").config();

const express = require("express");
const { createServer } = require("node:http");
const ejs = require("ejs");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = process.env.PORT || 8000;

app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.status(200);
    res.render("index");
})

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("chat message", (msg) => {
        socket.broadcast.emit("chat message", msg);
    })

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    })

    // sending message to the client
    // socket.emit("message", "Hello from Server");

    // recieving message from the client
    // socket.on("message", (msg) => {
    //     console.log("client message:" + " " + msg)
    // })
})

server.listen(port, () => {
    console.log(`App is running on port ${port}`);
})