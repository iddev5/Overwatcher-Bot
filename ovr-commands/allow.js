///////////////////////////////////////////////
// Overwatcher Bot
// Copyright (c) 2020 Ayush Bardhan Tripathy
// See LICENSE.md for additional info.
///////////////////////////////////////////////

function allow(client, message, args, db) {
	const which = message.mentions.roles.first();
	
	db.push("/" + message.guild.id + "/permitteds/", [which.id], false);
} 

module.exports = {
	name: "allow",
	command: allow
};