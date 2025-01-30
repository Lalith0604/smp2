const express = require('express');
const mysql = require('mysql');
const path = require('path');


const { Client } = require('pg');

const app = express();
const port = process.env.PORT;

// Middleware for JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'smp/public')));

// Route to serve index.html when the root is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

// MySQL connection

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'YOUR_CLOUD_SQL_PUBLIC_IP',
    port: process.env.DB_PORT || 3306,  // Default MySQL port
    user: process.env.DB_USER || 'your-db-username',
    password: process.env.DB_PASSWORD || 'your-db-password',
    database: process.env.DB_NAME || 'your-database-name',
    ssl: {
        rejectUnauthorized: false
    }
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
