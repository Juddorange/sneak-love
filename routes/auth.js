const express = require('express');
const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const router = new express.Router();

router.get('/signup', (req, res) => {
	res.render('signup');
});

router.post('/signup', (req, res) => {
	userModel
		.findOne({ email: req.body.email })
		.then((dbRes) => {
			if (dbRes) {
				res.render('signup', { msg: { text: 'This email adress is already use' } });
				return;
			} else {
				const { name, lastname, email, password } = req.body;
				const newUser = {
					name,
					lastname,
					email,
					password
				};
				const salt = bcrypt.genSaltSync(10);
				const hashed = bcrypt.hashSync(newUser.password, salt);
				newUser.password = hashed;
				userModel.create(newUser).then(() => res.redirect('/')).catch((err) => console.log(err));
			}
		})
		.catch((dbErr) => console.log(dbErr));
});

router.get('/signin', (req, res) => {
	res.render('signin');
});

router.post('/signin', (req, res) => {
	const user = req.body;
	userModel
		.findOne({ email: user.email })
		.then((dbRes) => {
			if (!dbRes) {
				res.render('signin', { msg: { text: 'Incorrect email or password' } });
				return;
			} else {
				if (bcrypt.compareSync(user.password, dbRes.password)) {
					req.session.currentUser = user;
					res.redirect('/');
				} else {
					res.render('signin', { msg: { text: 'Incorrect email or password' } });
					return;
				}
			}
		})
		.catch((err) => console.log(err));
});

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		res.locals.loggedin = 'false';
		res.redirect('/');
	});
});

module.exports = router;
