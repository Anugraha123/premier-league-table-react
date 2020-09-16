const express = require('express');
const cors = require('cors')

const data = require('./src/data/db.json')

const app = express();

app.use(cors())

app.get('/premier-league', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	return res.send(data);
});

app.listen(8080);
