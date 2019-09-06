const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
	name: String,
	lastname: String,
	email: String,
	password: String
});

const User = mongoose.model('Users', user);

module.exports = User;
