const express = require('express');
const app = express();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test'
});

app.use(express.json());

app.get('/api/categories', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error('error running query:', err);
      res.status(500).send({ message: 'Error fetching categories' });
    } else {
      res.send(results);
    }
  });
});

app.post('/api/categories', (req, res) => {
  const { categoryName } = req.body;
  db.query('INSERT INTO categories SET ?', { categoryName }, (err, results) => {
    if (err) {
      console.error('error running query:', err);
      res.status(500).send({ message: 'Error creating category' });
    } else {
      res.send({ id: results.insertId, categoryName });
    }
  });
});

app.put('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  db.query('UPDATE categories SET categoryName = ? WHERE id = ?', [categoryName, id], (err, results) => {
    if (err) {
      console.error('error running query:', err);
      res.status(500).send({ message: 'Error updating category' });
    } else {
      res.send({ id, categoryName });
    }
  });
});

app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM categories WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('error running query:', err);
      res.status(500).send({ message: 'Error deleting category' });
    } else {
      res.send({ message: 'Category deleted successfully' });
    }
  });
});