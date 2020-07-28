///////////////////////////////////////////////
// Overwatcher Bot
// Copyright (c) 2020 Ayush Bardhan Tripathy
// See LICENSE.md for additional info.
///////////////////////////////////////////////

const config = require("../config.js");

function setrole(client, message, args, db) {
	const role  = args[1];
	const which = message.mentions.roles.first();
		
	if(config.roles.includes(role.toLowerCase())) {
		db.push("/" + message.guild.id + "/roles/" + role, which.id);
	}
}

module.exports = {
	name: "setrole",
	command: setrole
};