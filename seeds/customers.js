const mongoose = require("mongoose")
const Customer = require("../models/customer")
const Order = require("../models/order")
const Product = require("../models/product")

mongoose.connect('mongodb://localhost:27017/curbside-pickup');

const random = (items) => items[Math.floor(Math.random()*items.length)];

const generateOrder = async () => {
    const order = new Order({
    })
    let rand = Math.floor(Math.random()*4)
    for(let i = 0; i <= rand; i++){
        order.products.push(await Product.random())
    }
    await order.save()
    return order
}

const generateCustomers = async () => {
    await Customer.deleteMany({})
    await Order.deleteMany({})
    for(let i = 0; i<5; i++){
        let names = ["Carla", "Randolph", "Mary", "Kristel", "Joe", "Chris", "Marlon", "Sam", "Vanessa", "Marcos", "Carlos", "John", "Hugo", "Nancy", "Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David", "Edward", "Fred", "Frank", "George", "Hal", "Hank", "Ike", "John", "Jack", "Joe", "Larry", "Monte", "Matthew", "Mark", "Nathan", "Otto", "Paul", "Peter", "Roger", "Roger", "Steve", "Thomas", "Tim", "Ty", "Victor", "Walter"]
        let lastNames = ["Anderson", "Ashwoon", "Aikin", "Bateman", "Bongard", "Bowers", "Boyd", "Cannon", "Cast", "Deitz", "Dewalt", "Ebner", "Frick", "Hancock", "Haworth", "Hesch", "Hoffman", "Kassing", "Knutson", "Lawless", "Lawicki", "Mccord", "McCormack", "Miller", "Myers", "Nugent", "Ortiz", "Orwig", "Ory", "Paiser", "Pak", "Pettigrew", "Quinn", "Quizoz", "Ramachandran", "Resnick", "Sagar", "Schickowski", "Schiebel", "Sellon", "Severson", "Shaffer", "Solberg", "Soloman", "Sonderling", "Soukup", "Soulis", "Stahl", "Sweeney", "Tandy", "Trebil", "Trusela", "Trussel", "Turco", "Uddin", "Uflan", "Ulrich", "Upson", "Vader", "Vail", "Valente", "Van Zandt", "Vanderpoel", "Ventotla", "Vogal", "Wagle", "Wagner", "Wakefield", "Weinstein", "Weiss", "Woo", "Yang", "Yates", "Yocum", "Zeaser", "Zeller", "Ziegler", "Bauer", "Baxster", "Casal", "Cataldi", "Caswell", "Celedon", "Chambers", "Chapman", "Christensen", "Darnell", "Davidson", "Davis", "DeLorenzo", "Dinkins", "Doran", "Dugelman", "Dugan", "Duffman", "Eastman", "Ferro", "Ferry", "Fletcher", "Fietzer", "Hylan", "Hydinger", "Illingsworth", "Ingram", "Irwin", "Jagtap", "Jenson", "Johnson", "Johnsen", "Jones", "Jurgenson", "Kalleg", "Kaskel", "Keller", "Leisinger", "LePage", "Lewis", "Linde", "Lulloff", "Maki", "Martin", "McGinnis", "Mills", "Moody", "Moore", "Napier", "Nelson", "Norquist", "Nuttle", "Olson", "Ostrander", "Reamer", "Reardon", "Reyes", "Rice", "Ripka", "Roberts", "Rogers", "Root", "Sandstrom", "Sawyer", "Schlicht", "Schmitt", "Schwager", "Schutz", "Schuster", "Tapia", "Thompson", "Tiernan", "Tisler"]
        const customer = new Customer({
            firstName: random(names),
            lastName: random(lastNames),
            phoneNumber: Math.floor(100000000 + Math.random() * 900000000),
        })
        let rand = Math.floor(Math.random()*2)
        for(let i = 0; i <= rand; i++){
            const order = await generateOrder()
            order.customer = customer
            await order.save()
            customer.orders.push(order)
        }
        await customer.save()
    }
}

generateCustomers().then(() => {
    mongoose.connection.close();
})
