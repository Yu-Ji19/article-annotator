const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let URL = new Schema({
    url: {
        type: String
    }
})


// create a model called Todo based on the above schema
module.exports = mongoose.model('URL', URL);