const mongoose = require('mongoose');

const definition = { 
    id: String,
    name: String,
    items: [{
    id: String,
    name: String,
    price: Number
    }]
};
const schema = mongoose.Schema(definition);
const model = mongoose.model('Category', schema);
module.exports = model;