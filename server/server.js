const express = require('express');
const mongoose = require('mongoose');
const roomcardRoutes = require('./routes/roomcards-routes');
const userRoutes = require('./routes/user-routes');
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(roomcardRoutes);
app.use(userRoutes);


mongoose
	.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((res) => console.log('Connected to MongoDB'))
	.catch((err) => console.log(`DB connection error: ${err}`));

app.listen(process.env.PORT, (err) => {
	err ? console.log(err) : console.log(`listening port ${process.env.PORT}`);
});