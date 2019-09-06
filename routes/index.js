const express = require('express');
const router = express.Router();
const sneakerModel = require('../models/Sneaker');
const tagModel = require('../models/Tag');

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/sneakers/:cat', (req, res) => {
	if (req.params.cat === 'collection') {
		sneakerModel
			.find()
			.then((dbRes) =>
				tagModel
					.find()
					.then((response) =>
						res.render('products', { sneakers: dbRes, category: req.params.cat, tags: response })
					)
			)
			.catch((error) => console.log(error))
			.catch((err) => console.log(err));
	} else {
		sneakerModel
			.find({ category: req.params.cat })
			.then((dbRes) =>
				tagModel
					.find()
					.then((response) =>
						res.render('products', { sneakers: dbRes, category: req.params.cat, tags: response })
					)
			)
			.catch((error) => console.log(error))
			.catch((err) => console.log(err));
	}
});

router.get('/one-product/:id', (req, res) => {
	sneakerModel
		.findById(req.params.id)
		.then((dbRes) => res.render('one_product', { sneaker: dbRes }))
		.catch((err) => console.log(err));
});

module.exports = router;
