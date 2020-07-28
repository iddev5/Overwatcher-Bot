///////////////////////////////////////////////
// Overwatcher Bot
// Copyright (c) 2020 Ayush Bardhan Tripathy
// See LICENSE.md for additional info.
///////////////////////////////////////////////

function add(client, message, args, db) {
	var word = args[1].toLowerCase();
			
	db.push("/" + message.guild.id + "/bannedWords", [word], false);
}

module.exports = {
	name: "add",
	command: add
};