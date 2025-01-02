import mongoose from 'mongoose';
import { phoneNumberRegex } from '../utils/regex.js';

const workSchema = new mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true, min: 0 },
});

const serviceSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
	address: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: Number,
		required: true,
		unqiue: true,
		match: [phoneNumberRegex, 'Invalid phone number'],
	},
	photos: {
		type: Array,
		of: String,
	},
	category: {
		type: String,
		trim: true,
		required: true,
	},
	work: {
		type: [workSchema],
		required: true,
	},
});

const Service = new mongoose.model('Service', serviceSchema);

export default Service;
