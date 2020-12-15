const Discord = require('discord.js');
const MongoClient = require('mongodb').MongoClient;

var _db;
const cooldowns = new Discord.Collection();
const options = {
    connectToDB: function(callback) {
        MongoClient.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
            _db = client.db('yadurga');
            return callback(err);
        });
    },
    db: function() {
        return _db;
    }
}

module.exports = { cooldowns, options };