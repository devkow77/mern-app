import { passwordRegex } from '../utils/regex.js';

export const checkEmail = {
	email: {
		isEmail: {
			errorMessage: 'Invalid email',
		},
		normalizeEmail: true,
		notEmpty: {
			errorMessage: 'Email is required',
		},
	},
};

export const createUser = {
	name: {
		isString: {
			errorMessage: 'Invalid name',
		},
		isLength: {
			options: {
				min: 3,
				max: 15,
			},
			errorMessage: 'Name must be between 3 and 15 characters long',
		},
		notEmpty: {
			errorMessage: 'Name is required',
		},
	},
	email: {
		isString: {
			errorMessage: 'Invalid email',
		},
		normalizeEmail: true,
		notEmpty: {
			errorMessage: 'Email is required',
		},
	},
	password: {
		isString: {
			errorMessage: 'Invalid password',
		},
		notEmpty: {
			errorMessage: 'Password is required',
		},
		matches: {
			options: passwordRegex,
			errorMessage: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number',
		},
	},
	phoneNumber: {
		isString: {
			errorMessage: 'Invalid phone number',
		},
		notEmpty: {
			errorMessage: 'Phone number is required',
		},
		isLength: {
			options: {
				min: 9,
				max: 9,
			},
			errorMessage: 'Phone number must be 9 characters long',
		},
	},
};

export const loginUser = {
	email: {
		isEmail: {
			errorMessage: 'Invalid email',
		},
		normalizeEmail: true,
		notEmpty: {
			errorMessage: 'Email is required',
		},
	},
	password: {
		isString: true,
		notEmpty: {
			errorMessage: 'Password is required',
		},
	},
};
