const Discord = require('discord.js');
const vars = require("../data/vars");
const utils = require("../data/utils");
const proles = require("../data/programming-roles");
const piroles = require("../data/ping-roles");

module.exports = (client, reaction, user) => {
    if (reaction.partial) {
        // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
        try {
            reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
            // Return as `reaction.message.author` may be undefined/null
            return;
        }
    }

    const member = reaction.message.guild.member(user);

    if (proles[reaction.emoji.name] && reaction.message.id === "837353393646600243") {
        let role = reaction.message.guild.roles.cache.find(r => r.id === proles[reaction.emoji.name]);

        member.roles.remove(role);
    }

    if (piroles[reaction.emoji.name] && reaction.message.id === "837349820062236684") {
        let role = reaction.message.guild.roles.cache.find(r => r.id === piroles[reaction.emoji.name]);

        member.roles.remove(role);
    }
};