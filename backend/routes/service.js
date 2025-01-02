import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Service from '../models/Service.js';

const router = Router();

router.get('/user', async (req, res) => {
	const { token } = req.cookies;

	if (!token) {
		return res.status(400).json(null);
	}

	jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
		if (err) throw err;
		const { id } = userData;
		const userServices = await Service.find({ owner: id });
		res.status(200).json(userServices);
	});
});

router.post('/create', async (req, res) => {
	const { token } = req.cookies;

	if (!token) {
		return res.status(400).send('No authorization token!');
	}

	const data = req.body;

	jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
		if (err) throw err;
		const newService = await Service.create({
			owner: userData.id,
			...data,
		});

		res.status(200).json(newService);
	});
});

export default router;
