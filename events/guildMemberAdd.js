const Discord = require('discord.js');
const utils = require("../data/utils");

module.exports = (client, member) => {
    let role = member.guild.roles.cache.find(r => r.id === process.env.MEMBER_ROLE);

    member.roles.add(role);

    const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`Welcome ${member.displayName}`)
        .setColor(utils.randomHex())
        .setDescription(`Welcome ${member.user.username} to Code++!\n• Make sure to read <#788186389853634580> before getting started!\n• Grab yourself some roles at <#788275622711525406>!\n• 10+ Languages Supported!\nYou are our member number ${member.guild.members.cache.filter(member => !member.user.bot).size}!`)
        .setTimestamp();

    client.channels.cache.get(process.env.WELCOME).send(embed);
};