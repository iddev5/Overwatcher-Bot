///////////////////////////////////////////////
// Overwatcher Bot
// Copyright (c) 2020 Ayush Bardhan Tripathy
// See LICENSE.md for additional info.
///////////////////////////////////////////////

function remove(client, message, args, db) {
	var word = args[1].toLowerCase();
	var index = -1;
			
	const bannedWords = db.getData("/" + message.guild.id + "/bannedWords");
			
	for(i = 0; i < bannedWords.length; i++) {
		if(bannedWords[i] == word) index = i;
	}
			
	bannedWords.splice(index, 1);
	db.push("/" + message.guild.id + "/bannedWords", bannedWords);
}

module.exports = {
	name: "remove",
	command: remove
};