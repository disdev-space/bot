const Discord = require('discord.js');
const utils = require("../data/utils");

module.exports = (client, member) => {
    if (!member.user.bot) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`Welcome ${member.displayName}`)
            .setColor(utils.randomHex())
            .setDescription(`Welcome ${member.user.username} to Code++!\n• Make sure to read <#788186389853634580> before getting started!\n• Grab yourself some roles at <#788275622711525406>!\n• 10+ Languages Supported!\nYou are our member number ${member.guild.members.cache.filter(member => !member.user.bot).size}!`)
            .setTimestamp();

        client.channels.cache.get("837376927072387178").send(embed);
    }
};
