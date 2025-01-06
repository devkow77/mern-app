import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Place from '../models/Place.js';

const router = Router();

// pobierz wszystkie miejsca
router.get('/', async (req, res) => {
	res.json(await Place.find({}));
});

// pobierz wszystkie miejsca zalogowanego uzytkownika
router.get('/user', async (req, res) => {
	const { token } = req.cookies;
	jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
		const { id } = userData;
		res.json(await Place.find({ owner: id }));
	});
});

// znajdz miejsce
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	res.json(await Place.findById(id));
});

// dodaj nowe miejsce
router.post('/create', async (req, res) => {
	const { token } = req.cookies;
	const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
	jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
		if (err) throw err;
		const placeDoc = await Place.create({
			owner: userData.id,
			title,
			address,
			photos: addedPhotos,
			description,
			perks,
			extraInfo,
			checkIn,
			checkOut,
			maxGuests,
			price,
		});
		res.json(placeDoc);
	});
});

// edytuj miejsce
router.put('/edit', async (req, res) => {
	const { token } = req.cookies;
	const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		if (err) throw err;
		const placeDoc = await Place.findById(id);
		if (userData.id === placeDoc.owner.toString()) {
			placeDoc.set({
				title,
				address,
				photos: addedPhotos,
				description,
				perks,
				extraInfo,
				checkIn,
				checkOut,
				maxGuests,
				price,
			});
			await placeDoc.save();
			res.json('ok');
		}
	});
});

export default router;
