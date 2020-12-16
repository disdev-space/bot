require('dotenv').config()
require("./setup")();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({ extended: false }));

app.post('/votes/end/point', (req, res) => {
    console.log(req.body);
});

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));