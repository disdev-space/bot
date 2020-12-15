const utils = require("../data/utils");

module.exports = {
    name: 'kick',
    description: 'Kicks a user',
    guildOnly: true,
    execute(message, args, options, client) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            let member = message.mentions.members.first() || message.guild.members.cache.find(user => user.displayName == args[0]) || message.guild.members.cache.find(user => user.id == args[0]);

            if (!member)
                return message.channel.send(utils.createWarning('You didn\'t tell me who to kick!'));
            else {
                if (args[2])
                    var kick_reason = args.splice(3).join(" ");
                else
                    var kick_reason = "Not specified.";
                member.kick({ reason: kick_reason });
                setTimeout(function() {
                    return client.channels.cache.get(process.env.AUDIT).send(utils.createSuccess('Succesfully kicked ' + member.displayName + '!', 'Reason: `' + kick_reason + '`'));
                }, 500);
            }
        } else {
            message.channel.send(utils.createWarning("You need to have the `KICK_MEMBERS` permission!"));
        }
    },
};