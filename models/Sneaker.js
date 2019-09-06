const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sneaker = new Schema({
	name: String,
	ref: String,
	sizes: Number,
	description: String,
	price: Number,
	picName: String,
	picPath: String,
	category: { type: String, enum: [ 'men', 'women', 'kids' ] },
	id_tags: { type: Schema.Types.ObjectId, enum: [] }
});

const Sneakers = mongoose.model('Sneakers', sneaker);

module.exports = Sneakers;
