const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
	{
		host: 'localhost',
		// your MySQL username
		user: 'root',
		// your MySQL password
		password: 'MySQL_Root_Password1!',
		database: 'election'
	},
	console.log('Connected to the election database')
);

// default response for any other request (not found)
app.use((req, res) => {
	res.status(404).end();
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});