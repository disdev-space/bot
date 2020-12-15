const Discord = require('discord.js');
const utils = require('../data/utils');

module.exports = {
    name: 'review',
    description: 'Reviews server.',
    guildOnly: true,
    execute(message, args) {
        const stars = parseInt(args[0]);
        if (isNaN(stars) || stars > 5)
            return message.channel.send(utils.createError("Not a valid number!\nMake sure it's a number from 0 to 5"));
        var review = args.splice(1).join(" ");
        if (review === "")
            return message.channel.send(utils.createError("No review written"));
        let starRating = "Star rating: "
        for (var i = 0; i < stars; i++)
            starRating += "⭐";

        if (stars === 0)
            starRating += "0 stars";

        const embed = new Discord.MessageEmbed()
            .setColor(utils.randomHex())
            .setAuthor(message.member.displayName, message.member.user.avatarURL())
            .setTitle("New review")
            .setDescription(review)
            .setTimestamp()
            .setFooter(starRating, message.guild.iconURL);

        const reviews = message.member.guild.channels.cache.get("788350381390168085");

        reviews.send(embed);
        return message.channel.send(utils.createSuccess("Success!", "Review sent!"));
    },
};