require('dotenv').config();

const express = require('express');
const cors = require('cors');
dotenv.config();
const db = require('./src/db/connection');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cookieSession({
  name: 'session',
  keys: ["somelongsecretkey987654321"],
}));

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));


const appointmentsRoutes = require('./routes/appointment');
const doctorsRoutes = require('./routes/doctor');
const documentsRoutes = require('./routes/document');
const profileRoutes = require('./routes/profile');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const indexRoutes = require('./routes/index');

app.use('/appointments', appointmentsRoutes);
app.use('/doctors', doctorsRoutes);
app.use('/documents', documentsRoutes);
app.use('/profile', profileRoutes);
app.use('/register', registerRoutes);
app.use('/', loginRoutes);
app.use('/', indexRoutes);


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
