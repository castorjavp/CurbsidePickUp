const mongoose = require("mongoose")
const Employee = require("../models/employee")

mongoose.connect('mongodb://localhost:27017/curbside-pickup');

const createEmployee = async () => {
    await Employee.deleteMany({})
    const employee = new Employee({
        firstName: "Castor",
        lastName: "Velasquez",
        username: "cxv3bjk"
    })
    await Employee.register(employee, "orejas#12")
    const employee2 = new Employee({
        firstName: "Wilma",
        lastName: "Simpson",
        username: "wxs4100"
    })
    await Employee.register(employee2, "nicaragua22")
    const employee3 = new Employee({
        firstName: "Admin",
        lastName: "",
        username: "admin"
    })
    await Employee.register(employee3, "admin")
}

createEmployee().then(() => {
    mongoose.connection.close();
})
