const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/flights', async (req, res) => {
  try {
    const { data } = await axios.get('https://opensky-network.org/api/states/all');
    const flightsToDublin = data.states.filter(flight => flight[2] === 'EIDW');
    res.json(flightsToDublin);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
