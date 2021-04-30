const Discord = require('discord.js');
const MongoClient = require('mongodb').MongoClient;

var _db;
const cooldowns = new Discord.Collection();

module.exports = { cooldowns };