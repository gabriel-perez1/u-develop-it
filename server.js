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

/* returns all the data in the candidates table
db.query(`SELECT * FROM candidates`, (err, rows) => {
	console.log(rows);
});*/

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

// GET all candidates
app.get('/api/candidates', (req, res) => {
	const sql = `SELECT * FROM candidates`;

	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({
			message: 'success',
			data: rows
		});
	});
});

// get a single candidate
app.get('/api/candidate/:id', (req, res) => {
	const sql = `SELECT * FROM candidates WHERE id = ?`;
	const params = [req.params.id];

	db.query(sql, params, (err, row) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: 'success',
			data: row
		});
	});
});

/* delete a candidate
db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
	if (err) {
		console.log(err);
	} 
	console.log(result);
});*/

// Create a candidate
/*onst sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
							VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
	if (err) {
		console.log(err);
	}
	console.log(result);
}); */

// default response for any other request (not found)
app.use((req, res) => {
	res.status(404).end();
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});