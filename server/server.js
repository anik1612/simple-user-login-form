const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public/photos')));
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

app.post('/upload', (req, res) => {
	file = req.files.file;
	fullName = req.body.name;
	email = req.body.email;

	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	let path = __dirname + '/public/photos/' + file.name;

	// Use the mv() method to place the file somewhere on your server
	file.mv(path, (err) => {
		if (err) return res.status(500).send(err);
		res.json({
			success: true,
			message: 'date inserted successfully',
			name: fullName,
			email: email,
			photo: file,
		});
	});
});

app.get('/', (req, res) => {
	res.json({
		name: fullName,
		email: email,
		photo: file,
	});
});
app.listen(port, () => console.log('running'));
