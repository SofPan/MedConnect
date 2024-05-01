// app.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./src/db/connection');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

// Testing frontend connection
app.get('/api', (req, res) => {
  res.json({ test: "test" });
});

// Testing db connection
app.get('/api/users', async (req, res) => {
  db.query('SELECT * FROM users;')
    .then(data => console.log(data.rows))
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
