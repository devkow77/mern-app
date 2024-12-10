import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
		unique: true,
	},
	photos: {
		type: [String],
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	workingHours: [String],
	facilities: [String],
	services: [String],
	price: Number,
});

const Place = new mongoose.model('Place', placeSchema);

export default Place;
