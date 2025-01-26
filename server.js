const express = require('express');
const mysql = require('mysql');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware for JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve index.html when the root is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// MySQL connection

const connectionString = process.env.DATABASE_URL; // Use DATABASE_URL or your variable name


const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// Form submission route
app.post('/submit', (req, res) => {
    const { name, phone } = req.body;

    if (!name || !phone) {
        return res.status(400).send('Name and phone are required.');
    }

    const query = 'INSERT INTO appointments (name, phone) VALUES (?, ?)';
    db.query(query, [name, phone], (err) => {
        if (err) return res.status(500).send('Database error.');
        res.status(200).send('Details submitted successfully.');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
