var socket = io();
let checkedInBtn = document.getElementById("checked-in-btn")
let notReadyBtn = document.getElementById("left-button")
let readyBtn = document.getElementById("ready-btn")
let doneBtn = document.getElementById("right-button")
let list = document.getElementById("interest-list")
let status_ = ""

socket.on("change", (data) => {
    let {orders, status_} = data
    console.log(status_)
    while(list.firstChild){
        list.removeChild(list.lastChild)
    }
    for(let order of orders){
        console.log(order.status)
        if(order.status_ == status_){
            let a = document.createElement("a")
            a.href = ""
            let li = document.createElement("li")
            a.appendChild(li)
            li.appendChild(document.createTextNode(order._id))
            list.appendChild(a)
        }
    }
})


checkedInBtn.addEventListener("click", () => {
    status_ = "checked in"
    socket.emit("change", status_)
})
notReadyBtn.addEventListener("click", () => {
    status_ = "not ready"
    socket.emit("change", status_)
})
readyBtn.addEventListener("click", () => {
    status_ = "ready for pickup"
    socket.emit("change", status_)
})
doneBtn.addEventListener("click", () => {
    status_ = "done"
    socket.emit("change", status_)
})
