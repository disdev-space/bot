const Discord = require('discord.js');
const vars = require("../data/vars");
const utils = require("../data/utils");

module.exports = (client, oldMessage, newMessage) => {
        if (oldMessage.content != newMessage.content) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Message modified!\nOn the channel \`${newMessage.channel.name}\``)
                .setColor(utils.randomHex())
                .setDescription(`Message ID: \`${newMessage.id}\``)
                .addField(`New message content:`, `${newMessage.content.replace("`", "\`")}`)
            .addField(`Old message content:`, `${oldMessage.content.replace("`", "\`")}`)
            .setAuthor(newMessage.member.user.username, newMessage.member.user.displayAvatarURL({ dynamic: true }))
            .setURL(`https://discord.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id}`)
            .setTimestamp();
        client.channels.cache.get(process.env.AUDIT).send(embed);
    }
};