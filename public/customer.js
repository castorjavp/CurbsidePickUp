var socket = io();
let checkedInBtn = document.getElementById("checked-in-btn")
let notReadyBtn = document.getElementById("left-button")
let readyBtn = document.getElementById("ready-btn")
let doneBtn = document.getElementById("right-button")
let list = document.getElementById("interest-list")
let btns = document.getElementsByClassName("app-btn")
let status_ = ""
let current_tab = "not ready"

socket.on("changeCust", (data) => {
    let {orders, status_} = data
    if(status_ == "current_tab"){
        status_ = current_tab
    }
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
            if(order.status_ == 'ready for pickup'){
                let btn = document.createElement("button")
                btn.type = "button"
                btn.classList.add("btn", "btn-dark", "app-btn")
                btn.value = order._id
                btn.addEventListener("click", async () => {
                    data = {id:btn.getAttribute("value"), type:btn.textContent}
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
    }
})


checkedInBtn.addEventListener("click", () => {
    status_ = "checked in"
    current_tab = "checked in"
    socket.emit("changeCust", status_)
})
notReadyBtn.addEventListener("click", () => {
    status_ = "not ready"
    current_tab = "not ready"
    socket.emit("changeCust", status_)
})
readyBtn.addEventListener("click", () => {
    status_ = "ready for pickup"
    current_tab = "ready for pickup"
    socket.emit("changeCust", status_)
})
doneBtn.addEventListener("click", () => {
    status_ = "done"
    current_tab = "done"
    socket.emit("changeCust", status_)
})
