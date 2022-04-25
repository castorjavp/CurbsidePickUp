const express = require("express")
const app = express();
const http = require('http');
const path = require("path")
const flash = require("connect-flash")
const session = require("express-session")
const { Server } = require("socket.io")
const mongoose = require("mongoose")
const Customer = require("./models/customer")
const Order = require("./models/order")
const Product = require("./models/product")
const Employee = require("./models/employee")
const { rectifyOrderStatus } = require("./utils/utils")
const passport = require("passport")
const LocalStrategy = require("passport-local")
mongoose.connect('mongodb://localhost:27017/curbside-pickup');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const server = http.createServer(app)
const io = new Server(server)


app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

const sessionCongif = {
    secret: 'env_variable',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true
    }
}

app.use(session(sessionCongif))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(Employee.authenticate()))
passport.serializeUser(Employee.serializeUser());
passport.deserializeUser(Employee.deserializeUser());

app.use((req, res, next) => {
    res.locals.employee = req.user
    next()
})

app.get("/emp", async (req, res) => {
    console.log(req.user)
    const orders = await Order.find({}).populate("customer").populate("products")
    res.render("emp", { orders })
})

app.get("/customer", async (req, res) => {
    const orders = await Order.find({}).populate("customer").populate("products")
    res.render("customer", { orders })
})

app.get("/emp/login", async (req, res) => {
    res.render("empLogin")
})

app.post("/emp/login", passport.authenticate('local', { failureRedirect: '/', failureMessage: true }), async (req, res) => {
    res.redirect("/emp")
})

app.get("/emp/logout", async (req, res) => {
    console.log("Ets")
    req.logout();
    res.redirect("/")
})

app.get("/", (req, res) => {
    console.log(req.session.messages)
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