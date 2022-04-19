var socket = io();
let checkedInBtn = document.getElementById("checked-in-btn")
let notReadyBtn = document.getElementById("left-button")
let readyBtn = document.getElementById("ready-btn")
let doneBtn = document.getElementById("right-button")
let list = document.getElementById("interest-list")
let btns = document.getElementsByClassName("app-btn")
let statusButtons = [checkedInBtn, notReadyBtn, readyBtn, doneBtn]
const radioButtons = document.querySelectorAll(".pickup-list .row .btn-group input")


for (let statusButton of statusButtons) {
    statusButton.addEventListener("click", () => {
        socket.emit("retrieveOrdersWithStatus", { status_: statusButton.innerText, socketId: socket.id })
    })
}

socket.on("updateOrdersBasedOnStatus", (ordersWithStatus) => {
    while (list.firstChild) {
        list.removeChild(list.lastChild)
    }
    for (let order of ordersWithStatus) {
        let a = document.createElement("a")
        a.href = "#"
        a.classList.add("list-group-item", "list-group-item-action")
        let div = document.createElement("div")
        div.classList.add("d-flex", "w-100", "justify-content-between")
        a.appendChild(div)
        let h5 = document.createElement("h5")
        h5.classList.add("mb-1")
        h5.textContent = order.customer.firstName + " " + order.customer.lastName + "  -  (" + order.customer.phoneNumber.toString().slice(0, 3) + ")" + order.customer.phoneNumber.toString().slice(3, 6) + "-" + order.customer.phoneNumber.toString().slice(6, 11)
        div.appendChild(h5)
        if (order.status_ == 'ready for pickup') {
            let btn = document.createElement("button")
            btn.type = "button"
            btn.classList.add("btn", "btn-dark", "app-btn")
            btn.value = order._id
            btn.addEventListener("click", async () => {
                data = { id: btn.getAttribute("value"), newStatus: btn.textContent.toLowerCase(), socketId: socket.id }
                socket.emit("changeOrderStatus", data)
            })
            btn.textContent = "Check In"
            div.appendChild(btn)
        }
        let p = document.createElement("p")
        p.classList.add("mb-1")
        p.textContent = order._id
        a.appendChild(p)
        let small = document.createElement("small")
        small.textContent = order.products[0].name
        a.appendChild(small)
        list.appendChild(a)
    }
})

socket.on("refresh", () => {
    socket.emit("retrieveOrdersWithStatus", { status_: getCurrentStatus(), socketId: socket.id })
})


const getCurrentStatus = () => {
    let currentStatus = 'not ready'
    for (let radioButton of radioButtons) {
        if (radioButton.checked) {
            currentStatus = radioButton.value
            break
        }
    }
    return currentStatus
}