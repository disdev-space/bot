const Discord = require('discord.js');
const utils = require("../data/utils");
const vars = require("../data/vars");

module.exports = {
    name: "report",
    description: "Reports a member",
    guildOnly: true,
    execute: async(message, args, options, client) => {
        let member = message.mentions.members.first() || message.guild.members.cache.find(user => user.displayName == args[0]) || message.guild.members.cache.find(user => user.id == args[0]);

        if (!member)
            return message.reply(utils.createWarning("Couldn't find that member"));

        if (member.hasPermission("BAN_MEMBERS") || member.bot)
            return message.channel.send(utils.createWarning("You can't report that member!"));

        if (!args[1])
            return message.channel.send(utils.createError("Please provide a reason for the report"));

        const embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor(member.displayName, member.displayAvatarURL)
            .addField(`Member:`, `${member.displayName} (ID: ${member.id})`)
            .addField(`Reported by:`, `${message.member}`)
            .addField(`Reported in:`, `${message.channel}`)
            .addField(`Reason:`, `${args.slice(1).join(" ")}`);

        client.channels.cache.get(process.env.REPORTS).send(embed);
        message.channel.send(utils.createSuccess("Successfully reported user!", "The staff team will review your report as soon as possible!"));
    }
}