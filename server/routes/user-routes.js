const express = require('express');
const cors = require("cors");
const {
	registerANewUser,
	loginUser,
	getUserCard,
	updateUserCard,
} = require('../controllers/user-controller');

const router = express.Router();
router.use(cors());
router.post('/registration', registerANewUser);
router.post('/login', loginUser);
router.post("/usercard", getUserCard);
router.patch("/changeinfo", updateUserCard);

module.exports = router;