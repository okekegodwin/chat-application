require("dotenv").config();

const express = require("express");
const { createServer } = require("node:http");
const ejs = require("ejs");

const app = express();
const server = createServer(app);
const port = process.env.PORT;

app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.status(200);
    res.render("index");
})

server.listen(port, () => {
    console.log(`App is running on port ${port}`);
})