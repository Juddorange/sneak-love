const tagModel = require('../models/Tag');

function findTags(res, content) {
	tagModel
		.find()
		.then((response) => res.render('products_add', { tags: response, msg: { text: content } }))
		.catch((error) => console.log(error));
}

function findTagsEdit(res, dbRes) {
	tagModel
		.find()
		.then((response) => res.render('product_edit', { sneaker: dbRes, tags: response }))
		.catch((error) => console.log(error));
}

module.exports = { findTags, findTagsEdit };
