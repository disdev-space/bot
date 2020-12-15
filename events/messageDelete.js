const Discord = require('discord.js');
const vars = require("../data/vars");
const utils = require("../data/utils");

module.exports = (client, message) => {
        const embed = new Discord.MessageEmbed()
            .setTitle(`Message deleted!\nOn the channel \`${message.channel.name}\``)
            .setColor(utils.randomHex())
            .setDescription(`Message ID: \`${message.id.replace("`", "\`")}`)
        .addField(`Message content:`, `${message.content.replace("`", "\`")}`)
        .setAuthor(message.member.user.username, message.member.user.displayAvatarURL({ dynamic: true }))
        .setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
        .setTimestamp();
    client.channels.cache.get(process.env.AUDIT).send(embed);
};