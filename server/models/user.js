const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.set('strictQuery', true);

const userSchema = new Schema({
	name: String,
	email: {
		type: String,
		unique: true,
	},
	phoneNumber: String,
	password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;