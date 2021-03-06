const express = require("express")
const app = express();
const http = require('http');
const path = require("path")
const { Server } = require("socket.io")
const mongoose = require("mongoose")
const Customer = require("./models/customer")
const Order = require("./models/order")
const Product = require("./models/product")
const Employee = require("./models/employee")
const { rectifyOrderStatus } = require("./utils/utils")

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


app.get("/emp", async (req, res) => {
    const orders = await Order.find({}).populate("customer").populate("products")
    res.render("emp", { orders })
})

app.get("/customer", async (req, res) => {
    const orders = await Order.find({}).populate("customer").populate("products")
    res.render("customer", { orders })
})

app.get("/", (req, res) => {
    res.render("home")
})



io.on("connection", (socket) => {

    socket.on("retrieveOrdersWithStatus", async (data) => {
        const ordersWithStatus = await Order.find({ status_: data.status_.toLowerCase() })
            .populate("customer")
            .populate("products")
        io.to(data.socketId).emit("updateOrdersBasedOnStatus", ordersWithStatus);
    })

    socket.on("changeOrderStatus", async (data) => {
        const order = await Order.findById(data.id)
        const newOrderStatus = rectifyOrderStatus(data.newStatus)
        order.status_ = newOrderStatus
        await order.save()
        io.emit("refresh")
    })
})

server.listen(3000, () => {
    console.log("Listening on port 3000")
})