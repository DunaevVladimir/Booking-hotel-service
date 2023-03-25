const Roomcard = require('../models/roomcard');

const handleError = (res, error) => {
	res.status(500).json({ error });
}

const getRoomcards = (req, res) => {
	Roomcard
		.find()
		.then((data) => {
			res.send({ status: "ok", data: data });
		})
		.catch((err) => handleError(res, err));
}

const getRoomcardsByFilter = (req, res) => {
	const { priceFrom, priceTo, areaFrom, areaTo, hotel, appartment, room } = req.body;
	Roomcard
		.find({
			$and: [
				{ price: { $gte: priceFrom } },
				{ price: { $lte: priceTo } },
				{ area: { $gte: areaFrom } },
				{ area: { $lte: areaTo } },
				{
					$or: [
						hotel,
						appartment,
						room
					]
				}
			]
		})
		.then((data) => {
			res.send({ status: "ok", data: data });
		})
		.catch((err) => handleError(res, err));
}

const getRoomcardById = (req, res) => {
	Roomcard
		.findById(req.params.id)
		.then((roomcard) => {
			res
				.status(200)
				.json(roomcard);
		})
		.catch((err) => handleError(res, err));
}

module.exports = {
	getRoomcards,
	getRoomcardsByFilter,
	getRoomcardById,
};