const Discord = require('discord.js');
const utils = require("../data/utils");

module.exports = (client, member) => {
    if (!member.user.bot) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`Goodbye ${member.displayName}`)
            .setColor(utils.randomHex())
            .setDescription(`${member.user.username} you will be missed!\nNumber of members: ${member.guild.members.cache.filter(member => !member.user.bot).size}!`)
            .setTimestamp();

        client.channels.cache.get("837376927072387178").send(embed);
    }
};
