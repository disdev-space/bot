const Discord = require('discord.js');
const fs = require('fs');
const { options } = require("./data/vars");
const Levels = require("discord-xp");

module.exports = () => {
    // Levels
    Levels.setURL(process.env.MONGO_URI);

    // Create discord.js client
    const client = new Discord.Client({ restTimeOffset: 200 });
    // A collection for all the commands
    client.commands = new Discord.Collection();

    // Gets all the commands from the "commands" folder
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        // Adds commands to commands collection
        client.commands.set(command.name, command);
        console.log(`Command loaded: ${file}`);
    }

    // Gets all the events from the "events" folder
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        // Run event
        client.on(file.replace(".js", ""), event.bind(null, client));
        console.log(`Event loaded: ${file}`);
    }

    // Connect to DB
    options.connectToDB(function(err) {
        if (err) throw (err);

        // Login
        client.login(process.env.DBT);
    });
};