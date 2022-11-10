const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// get all parties
router.get('/parties', (req, res) => {
	const sql = `SELECT * FROM parties`;
	
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

// get single party
router.get('/party/:id', (req, res) => {
	const sql = `SELECT * FROM parties WHERE id = ?`;
	const params = [req.params.id];

	db.query(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: 'success',
			data: rows
		});
	});
});

// delete a party
router.delete('/party/:id', (req, res) => {
	const sql = `DELETE FROM parties WHERE id = ?`;
	const params = [req.params.id];

	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: message });
			//checks if anything was deleted
		} else if (!result.affectedRows) {
			res.json({
				message: 'Party not found'
			});
		} else {
			res.json({
				message: 'deleted',
				changes: result.affectedRows,
				id: req.params.id
			});
		}
	});
});

// update a candidate's party
router.put('/candidate/:id', (req, res) => {
	const errors = inputCheck(req.body, 'party_id');
	if (errors) {
		res.status(400).json({ error: errors });
		return;
	};
	const sql = `UPDATE candidates SET party_id = ?
							WHERE id = ?`;
	const params = [req.body.party_id, req.params.id];
	
	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			//check if a record was found
		} else if (!result.affectedRows) {
			res.json({
				message: 'Candidate found'
			});
		} else {
			res.json({
				message: 'success',
				data: req.body,
				changes: result.affectedRows
			});
		}
	});
});

module.exports = router;