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
    console.log("CONNECTIONNN")
    socket.on("changeEmp", async (status_) => {
        const orders = await Order.find({}).populate("customer").populate("products")
        console.log(status_)
        io.emit("changeEmp", { orders, status_ })
    })
    socket.on("changeCust", async (status_) => {
        const orders = await Order.find({}).populate("customer").populate("products")
        console.log(status_)
        io.emit("changeCust", { orders, status_ })
    })
    socket.on("changeOrderStatus", async (data) => {
        const order = await Order.findById(data.id)
        let status_ = ""
        if (data.type == "Ready") {
            order.status_ = "ready for pickup"
            status_ = "not ready"
        }
        else if (data.type == "Done") {
            order.status_ = 'done'
            status_ = 'checked in'
        }
        else if (data.type == "Check In") {
            order.status_ = 'checked in'
            status_ = 'ready for pickup'
        }
        await order.save()
        const orders = await Order.find({}).populate("customer").populate("products")
        if (status_ == 'ready for pick up') {
            io.emit("changeCust", { orders, status_ })
            io.emit("changeEmp", { orders, status_: "current_tab" })
        } else {
            io.emit("changeEmp", { orders, status_ })
            io.emit("changeCust", { orders, status_: "current_tab" })
        }
    })
})

server.listen(3000, () => {
    console.log("Listening on port 3000")
})