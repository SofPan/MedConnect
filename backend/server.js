const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors()); 

app.get('/api', (req, res) => {
  res.json({test: "test"})
})


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
