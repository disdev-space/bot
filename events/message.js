const Discord = require('discord.js');
const { cooldowns, options } = require("../data/vars");
const utils = require("../data/utils");
const Levels = require("discord-xp");

module.exports = async(client, message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.content.includes('discord.gg/' || 'discordapp.com/invite/' || 'discord.com/invite/' || 'dsc.gg/'))
        return message.delete().then(message.channel.send(utils.createWarning("Invite links are not permitted in this server!")))

    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        const embed = new Discord.MessageEmbed()
            .setTitle(`**${message.member.user.username} has leveled up!**`)
            .setColor("#f47fff")
            .setDescription(`Congratulations <@!${message.member.user.id}>, you leveled up to **level ${user.level}**!`)
            .setAuthor(message.member.user.username, message.member.user.displayAvatarURL({ dynamic: true }))
        client.channels.cache.get("837588426567974955").send(message.author, embed);
    }

    if (!message.content.startsWith(process.env.PREFIX)) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const com = args.shift().toLowerCase();
    const command = client.commands.get(com);

    if (!client.commands.has(com)) return;

    if (!cooldowns.has(command.name))
        cooldowns.set(command.name, new Discord.Collection());

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(utils.createWarning(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`));
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        if (command.guildOnly && message.channel.type === 'dm')
            return message.channel.send(utils.createError('I can\'t execute that command inside DMs!'));
        command.execute(message, args, options, client);
    } catch (error) {
        message.channel.send(utils.createError(`An error occured while executing that command.\nError: \`${error}\``))
    }
};