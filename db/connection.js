const mysql = require('mysql2');

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
);

module.exports = db;