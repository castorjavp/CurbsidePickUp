const express = require("express")
const path = require("path")
const mongoose = require("mongoose")


const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)

const app = express();
<<<<<<< HEAD
app.use(express.static('public'))
=======
app.use(express.static("public"))
>>>>>>> 809258a5683d658d19595fd85648dc6ad59e2c24
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


app.get("/", (req, res) => {
    res.render("home")
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})