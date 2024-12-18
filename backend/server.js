const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'employee_forms',
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection failed:', err.message);
        process.exit(1);
    }
    console.log('Connected to MySQL successfully');
});

app.post('/register', (req, res) => {
    const { employee_id, name1, phone_number, dob, doj, email } = req.body;

    if (!employee_id || !name1 || !phone_number || !dob || !doj || !email) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    if (!/^\d{10}$/.test(phone_number)) {
        return res.status(400).send({ message: 'Invalid phone number format. Must be 10 digits.' });
    }

    const query = `
        INSERT INTO employee (employee_id, name1, phone_number, dob, doj, email)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [employee_id, name1, phone_number, dob, doj, email], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send({ message: 'Registration Failed' });
        }
        return res.status(201).send({ message: 'Registration Successful' });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
