const utils = require("../data/utils");

module.exports = {
    name: 'ban',
    description: 'Bans a user.',
    guildOnly: true,
    execute(message, args, options, client) {
        if (message.member.hasPermission("BAN_MEMBERS")) {
            let member = message.mentions.members.first() || message.guild.members.cache.find(user => user.displayName == args[0]) || message.guild.members.cache.find(user => user.id == args[0]);

            if (!member)
                return message.channel.send(utils.createWarning('You didn\'t tell me who to ban!'));
            else {
                var days = parseInt(args[1]);
                if (isNaN(days)) {
                    days = 7;
                }
                var ban_reason = "";
                if (args[2]) {
                    ban_reason = args.splice(3).join(" ");
                } else {
                    ban_reason = "Not specified.";
                }
                member.ban({ days: days, reason: ban_reason });
                setTimeout(function() {
                    return client.channels.cache.get(process.env.AUDIT).send(utils.createSuccess('Banned ' + member.displayName + '!', 'Reason: `' + ban_reason + '`\nDays of messages deleted: `' + days + '`'));
                }, 500);
            }
        } else
            message.channel.send(utils.createWarning("You need to have the `BAN_MEMBERS` permission!"));
    },
};