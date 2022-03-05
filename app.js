const express = require("express")
const path = require("path")
const mongoose = require("mongoose")


const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)

const app = express();
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


app.get("/", (req, res) => {
    res.render("home")
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})