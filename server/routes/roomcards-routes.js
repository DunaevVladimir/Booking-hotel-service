const express = require('express');
const cors = require("cors");
const {
	getRoomcards,
	getRoomcardsByFilter,
	getRoomcardById,
} = require('../controllers/roomcard-controller');

const router = express.Router();
router.use(cors());
router.get('/list', getRoomcards);
router.post('/filter', getRoomcardsByFilter);
router.get('/list/:id', getRoomcardById);

module.exports = router;