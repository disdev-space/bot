module.exports = (client, message) => {
    client.user.setPresence({ activity: { name: `DisDev.space`, type: 4 } });
    console.log("Ready!");
};