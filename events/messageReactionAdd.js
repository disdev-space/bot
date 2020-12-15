const Discord = require('discord.js');
const vars = require("../data/vars");
const utils = require("../data/utils");
const proles = require("../data/programming-roles");
const oroles = require("../data/os-roles");
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

    if (proles[reaction.emoji.name] && reaction.message.id === "788440289290485790") {
        let role = reaction.message.guild.roles.cache.find(r => r.id === proles[reaction.emoji.name]);

        member.roles.add(role);
    }

    if (oroles[reaction.emoji.name] && reaction.message.id === "788443662924120065") {
        let role = reaction.message.guild.roles.cache.find(r => r.id === oroles[reaction.emoji.name]);

        member.roles.add(role);
    }

    if (piroles[reaction.emoji.name] && reaction.message.id === "788445163465736213") {
        let role = reaction.message.guild.roles.cache.find(r => r.id === piroles[reaction.emoji.name]);

        member.roles.add(role);
    }
};