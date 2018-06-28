const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const schema = mongoose.Schema({});
schema.plugin(passportLocalMongoose);
const model = mongoose.model('User', schema);
module.exports = model;