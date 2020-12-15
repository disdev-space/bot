module.exports = (client, message) => {
    client.user.setPresence({ activity: { name: `at Code++`, type: 3 } });
    console.log("Ready!");
};