const express = require('express'); // import express in this module
const sneakerModel = require('../models/Sneaker');
const tagModel = require('../models/Tag');
const cloudinary = require('../config/cloudinary');
const dbQuery = require('../crud/sneakers_crud');
const router = new express.Router(); // create an app sub-module (router)

router.get('/prodadd', (req, res) => {
	dbQuery.findTags(res, '');
});

router.post('/tag', (req, res) => {
	tagModel
		.findOne({ label: req.body.label })
		.then((dbRes) => {
			if (dbRes) {
				dbQuery.findTags(res, 'This tag already exists');
				return;
			} else {
				tagModel.create(req.body).then(() => dbQuery.findTags(res, 'Your tag was created'));
			}
		})
		.catch((err) => console.log(err));
});

router.post('/prodadd', cloudinary.single('image'), (req, res) => {
	const { name, ref, sizes, description, price, category, id_tags } = req.body;
	const newSneaker = {
		name,
		ref,
		sizes,
		description,
		price,
		category,
		id_tags
	};
	newSneaker.picPath = req.file.secure_url;
	newSneaker.picName = req.file.originalname;

	sneakerModel
		.findOne({ ref: req.body.ref })
		.then((dbRes) => {
			if (dbRes) {
				dbQuery.findTags(res, 'This ref already exists');
			} else {
				sneakerModel
					.create(newSneaker)
					.then(() => dbQuery.findTags(res, 'Your product was created'))
					.catch((err) => console.log(err));
			}
		})
		.catch((dbErr) => console.log(dbErr));
});

router.get('/prod-manage', (req, res) => {
	sneakerModel
		.find()
		.then((dbRes) => {
			res.render('products_manage', { sneakers: dbRes });
		})
		.catch((err) => console.log(err));
});

router.get('/product-edit/:id', (req, res) => {
	sneakerModel
		.findById(req.params.id)
		.then((dbRes) => dbQuery.findTagsEdit(res, dbRes))
		.catch((err) => console.log(err));
});

router.post('/edit/:id', (req, res) => {
	const { name, ref, sizes, description, price, category, id_tags } = req.body;
	const editSneaker = {
		name,
		ref,
		sizes,
		description,
		price,
		category,
		id_tags
	};
	sneakerModel
		.findByIdAndUpdate(req.params.id, editSneaker)
		.then((dbRes) => res.redirect('/prod-manage'))
		.catch((err) => console.log(err));
});

router.get('/delete/:id', (req, res) => {
	sneakerModel
		.findByIdAndRemove(req.params.id)
		.then((dbRes) => res.redirect('/prod-manage'))
		.catch((err) => console.log(err));
});

module.exports = router;
