const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tag = new Schema({
	label: String
});

const Tag = mongoose.model('Tags', tag);

module.exports = Tag;
