const express = require("express")
const app = express();
const http = require('http');
const path = require("path")
const {Server} = require("socket.io")
const mongoose = require("mongoose")
const Customer = require("./models/customer")
const Order = require("./models/order")
const Product = require("./models/product")
const Employee = require("./models/employee")

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


app.get("/emp", async (req,res) => {
    const orders = await Order.find({})
    res.render("emp", {orders})
})

app.get("/customer", (req,res) => {
    res.render("customer")
})

app.get("/", (req, res) => {
    res.render("home")
})



io.on("connection", (socket) => {
    console.log("CONNECTIONNN")
    socket.on("change", async (status_) => {
        const orders = await Order.find({})
        console.log(status_)
        io.emit("change", {orders, status_})
    })
})

server.listen(3000, () => {
    console.log("Listening on port 3000")
})