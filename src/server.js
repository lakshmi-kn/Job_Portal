// server.js or app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/register-jobseeker', (req, res) => {
  const data = req.body;
  console.log('Received jobseeker data:', data);

  // Here you’d save to the database
  res.status(200).json({ message: 'Jobseeker registered successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
