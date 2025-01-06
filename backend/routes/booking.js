import { Router } from 'express';
import { getUserFromToken } from './user.js';

const router = Router();

// pobierz wszystkie rezerwacje zalogowanego uzytkownika
router.get('/', async (req, res) => {
	const userData = await getUserFromToken(req);
	res.json(await Booking.find({ user: userData.id }));
});

// dodaj nowa rezerwacje
router.post('/create', async (req, res) => {
	const userData = await getUserFromToken(req);
	const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;
	Booking.create({
		place,
		checkIn,
		checkOut,
		name,
		phone,
		price,
		numberOfGuests,
		user: userData.id,
	})
		.then((doc) => {
			res.json(doc);
		})
		.catch((err) => {
			throw err;
		});
});

export default router;
