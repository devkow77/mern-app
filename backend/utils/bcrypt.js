import bcrypt from 'bcrypt';

const salt = 10;

export const hashPassword = (password) => {
	return bcrypt.hashSync(password, salt);
};

export const comparePasswords = (password, hashedPassword) => {
	return bcrypt.compareSync(password, hashedPassword);
};
