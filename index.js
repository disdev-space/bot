const Discord = require('discord.js');
const utils = require("./data/utils");

require('dotenv').config()
require("./setup")().then((client) => {
    const express = require('express');
    const app = express();
    const PORT = process.env.PORT || 3000;
    app.use(express.json({ extended: false }));

    app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
});