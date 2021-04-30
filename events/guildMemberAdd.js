const Discord = require('discord.js');
const utils = require("../data/utils");

module.exports = (client, member) => {
    if (!member.user.bot) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`Welcome ${member.displayName}`)
            .setColor(utils.randomHex())
            .setDescription(`Welcome ${member.user.username} to DisDev!\n• Make sure to read <#836919167968870410> before getting started!\n• Grab yourself some roles at <#836919202395979807>!\n• Play a ton of coding challenges!\nYou are our member number ${member.guild.members.cache.filter(member => !member.user.bot).size}!`)
            .setTimestamp();

        client.channels.cache.get("837376927072387178").send(embed);
    }
};
