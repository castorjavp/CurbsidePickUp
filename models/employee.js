const mongoose = require('mongoose');
const Schema = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose")

const employeeSchema = new Schema({
    firstName: String,
    lastName: String,
    credentials: String
})

employeeSchema.plugin(passportLocalMongoose)

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee