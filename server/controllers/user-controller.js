const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const handleError = (res, error) => {
	res.status(500).json({ error });
}

const registerANewUser = async (req, res) => {
	const { name, email, phoneNumber, password } = req.body;

	const encryptedPassword = await bcrypt.hash(password, 10);
	try {
		const oldUser = await User.findOne({ email });
		if (oldUser) {
			return res.send({ error: "User Exist" });
		}
		await User.create({
			name,
			email,
			phoneNumber,
			password: encryptedPassword,
		})
		if (res.status(200)) {
			return res.json({ status: "ok" });
		}
	} catch (error) {
		handleError(res, error);
	}
}

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		return res.send({ error: "User not found" });
	}

	if (await bcrypt.compare(password, user.password)) {
		const token = jwt.sign({ email: user.email }, JWT_SECRET);

		if (res.status(200)) {
			return res.json({ status: "ok", data: token });
		}
		else {
			return res.json({ error: "error" })
		}
	}
	handleError(res, "Invalid Password");
}

const getUserCard = (req, res) => {
	const { token } = req.body;
	try {
		const user = jwt.verify(token, JWT_SECRET);
		const userEmail = user.email;
		User.findOne({ email: userEmail }).then((data) => {
			res.send({ status: "ok", data: data });
		})
	} catch (error) {
		handleError(res, error);
	}
}

const updateUserCard = async (req, res) => {
	const { name, email, phoneNumber, password, token } = req.body;
	try {
		const user = jwt.verify(token, JWT_SECRET);
		const userEmail = user.email;
		await User.findOneAndUpdate({ email: userEmail }, {
			$set: { name: name, email: email, phoneNumber: phoneNumber, password: password }
		}).then((data) => {
			const token = jwt.sign({ email: email }, JWT_SECRET);
			res.send({ status: "ok", data: data, token: token });
		})
	} catch (error) {
		handleError(res, error);
	}
}

module.exports = {
	registerANewUser,
	loginUser,
	getUserCard,
	updateUserCard,
};