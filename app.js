const express = require("express")
const app = express();
const path = require("path")
const {Server} = require("socket.io")
const http = require('http');
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/curbside-pickup');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const server = http.createServer(app)
const io = new Server(server)


app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


app.get("/emp", (req,res) => {
    res.render("emp")
})

app.get("/customer", (req,res) => {
    res.render("customer")
})

app.get("/", (req, res) => {
    res.render("home")
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})