import { Router } from 'express';
import User from '../models/User.js';
import { checkSchema } from 'express-validator';
import { checkEmail, createUser, loginUser } from '../validators/user.js';
import { checkDataValidation } from '../middlewares/index.js';
import { comparePasswords, hashPassword } from '../utils/bcrypt.js';
import jwt from 'jsonwebtoken';

const router = Router();

// sprawdzanie czy uzytkownik istnieje
router.post('/check', checkSchema(checkEmail), checkDataValidation, async (req, res) => {
	const { email } = req.data;

	try {
		const findUser = await User.findOne({ email });
		if (!findUser) return res.status(200).send('2');

		return res.status(200).send('1');
	} catch (err) {
		return res.status(400).send(err.message);
	}
});

// stworzenie nowego uzytkownika
router.post('/create', checkSchema(createUser), checkDataValidation, async (req, res) => {
	const { name, email, password, phoneNumber, role } = req.data;

	try {
		const newUser = await User.create({
			name,
			email,
			password: hashPassword(password),
			phoneNumber,
			role,
		});

		return res.status(200).json(newUser);
	} catch (err) {
		return res.status(400).send(err.message);
	}
});

// logowanie
router.post('/login', checkSchema(loginUser), checkDataValidation, async (req, res) => {
	const { email, password } = req.data;

	try {
		const findUser = await User.findOne({ email });

		if (!findUser) throw new Error('User not found');
		if (!comparePasswords(password, findUser.password)) throw new Error('Password is incorrect');

		jwt.sign(
			{
				email: findUser.email,
				id: findUser._id,
			},
			process.env.JWT_SECRET,
			{},
			(err, token) => {
				if (err) throw err;
				res.cookie('token', token, {
					sameSite: 'none',
					secure: true,
				}).json(findUser);
			}
		);
	} catch (err) {
		return res.status(400).send(err.message);
	}
});

// przegladanie profilu
router.get('/account', (req, res) => {
	const { token } = req.cookies;

	if (!token) {
		return res.json(null);
	}

	jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
		if (err) throw err;
		const findUser = await User.findById(userData.id);
		res.status(200).json(findUser);
	});
});

// wylogowanie
router.get('/logout', (req, res) => {
	res.cookie('token', '').json(true);
});

// pobierz dane zalogowanego uzytkownika
export const getUserFromToken = (req) => {
	return new Promise((resolve, reject) => {
		jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
			if (err) throw err;
			resolve(userData);
		});
	});
};

export default router;
