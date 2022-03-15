var socket = io();
let checkedInBtn = document.getElementById("checked-in-btn")
let notReadyBtn = document.getElementById("left-button")
let readyBtn = document.getElementById("ready-btn")
let doneBtn = document.getElementById("right-button")
let list = document.getElementById("interest-list")
let btns = document.getElementsByClassName("app-btn")
let status_ = ""

for(let btn of btns){
    btn.addEventListener("click", async () => {
        data = {id:btn.getAttribute("value"), type:btn.textContent}
        socket.emit("changeOrderStatus", data)
    })
}

socket.on("change", (data) => {
    let {orders, status_} = data
    while(list.firstChild){
        list.removeChild(list.lastChild)
    }
    for(let order of orders){
        if(order.status_ == status_){
            let a = document.createElement("a")
            a.href = "#"
            a.classList.add("list-group-item", "list-group-item-action")
            let div = document.createElement("div")
            div.classList.add("d-flex", "w-100", "justify-content-between")
            a.appendChild(div)
            let h5 = document.createElement("h5")
            h5.classList.add("mb-1")
            h5.textContent = order.customer.firstName + " " + order.customer.lastName + "  -  ("+ order.customer.phoneNumber.toString().slice(0,3) + ")" + order.customer.phoneNumber.toString().slice(3,6) + "-" + order.customer.phoneNumber.toString().slice(6,11)
            div.appendChild(h5)
            let btn = document.createElement("button")
            btn.type = "button"
            btn.classList.add("btn", "btn-dark", "app-btn")
            btn.value = order._id
            btn.addEventListener("click", async () => {
                data = {id:btn.getAttribute("value"), type:btn.textContent}
                socket.emit("changeOrderStatus", data)
            })
            btn.textContent = "Ready"
            div.appendChild(btn)
            let p = document.createElement("p")
            p.classList.add("mb-1")
            p.textContent = order._id
            a.appendChild(p)
            let small = document.createElement("small")
            small.textContent = order.products[0].name
            a.appendChild(small)
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
