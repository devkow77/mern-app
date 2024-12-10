import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
	place: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Place',
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	price: Number,
	service: String,
});

const Reservation = new mongoose.model('Reservation', reservationSchema);

export default Reservation;
