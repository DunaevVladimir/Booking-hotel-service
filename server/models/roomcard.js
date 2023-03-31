const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.set('strictQuery', true);

const cardSchema = new Schema({
	title: String,
	price: Number,
	area: Number,
	adress: String,
	description: String,
	type: String,
});

const Roomcard = mongoose.model('Roomcard', cardSchema);

module.exports = Roomcard;