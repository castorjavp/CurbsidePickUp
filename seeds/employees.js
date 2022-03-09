const mongoose = require("mongoose")
const Employee = require("../models/employee")

mongoose.connect('mongodb://localhost:27017/curbside-pickup');

const createEmployee = async () => {
    const employee = new Employee({
        firstName: "Castor",
        lastName: "Velasquez"
    })

    await employee.save();
}

createEmployee().then(() => {
    mongoose.connection.close();
})
