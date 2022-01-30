const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/companies");
const ObjectId = mongoose.Schema.ObjectId;
const Companies = mongoose.model(
    "companies",
    new mongoose.Schema({
        _id: mongoose.Schema.ObjectId,
        name: String,
        country: String,
        state: String,
        city: String,
        address: String,
        district: String,
        number: String,
        zip: String,
        email: String,
        phone: String,
    })
);

const DB = {
    Companies,
    ObjectId,
};
module.exports = DB;
