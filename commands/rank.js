const utils = require("../data/utils");
const Levels = require("discord-xp");

module.exports = {
    name: 'rank',
    description: 'Returns user rank.',
    guildOnly: true,
    async execute(message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.find(user => user.displayName == args[0]) || message.guild.members.cache.find(user => user.id == args[0]) || message.member;

        const user = await Levels.fetch(member.id, message.guild.id);

        if (!user) return message.channel.send(utils.createWarning("Seems like this user has not earned any XP so far."));

        message.channel.send(utils.generateEvent(`**${member.displayName}**'s rank`, `**${member.displayName}** current XP count is **${user.xp}**.\n**${member.displayName}** current level is **${user.level}**.`));
    },
};