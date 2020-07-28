///////////////////////////////////////////////
// Overwatcher Bot
// Copyright (c) 2020 Ayush Bardhan Tripathy
// See LICENSE.md for additional info.
///////////////////////////////////////////////

const config = require("../config.js");

function setchannel(client, message, args, db) {
	const channel = args[1];
	const which = message.mentions.channels.first();
	
	if(config.channels.includes(channel.toLowerCase())) {
		db.push("/" + message.guild.id + "/channels/" + channel, which.id);
	}
}

module.exports = {
	name: "setchannel",
	command: setchannel
};