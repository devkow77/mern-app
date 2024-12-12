import mongoose from 'mongoose';
import { emailRegex, passwordRegex, phoneNumberRegex } from '../utils/regex.js';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unqiue: true,
	},
	email: {
		type: String,
		required: true,
		unqiue: true,
		match: [emailRegex, 'Invalid email'],
	},
	password: {
		type: String,
		required: true,
		match: [passwordRegex, 'Invalid password'],
	},
	phoneNumber: {
		type: String,
		unique: true,
		required: true,
		match: [phoneNumberRegex, 'Invalid phone number'],
	},
	role: {
		type: String,
		enum: ['ADMIN', 'USER'],
		default: 'USER',
	},
});

const User = new mongoose.model('User', userSchema);

export default User;
