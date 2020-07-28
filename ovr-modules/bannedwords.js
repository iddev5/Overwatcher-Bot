///////////////////////////////////////////////
// Overwatcher Bot
// Copyright (c) 2020 Ayush Bardhan Tripathy
// See LICENSE.md for additional info.
///////////////////////////////////////////////

function bannedwords(client, message, args, db) {
	var bannedWords = db.getData("/" + message.guild.id + "/bannedWords");
		
	for(var i = 0; i < bannedWords.length; i++) {
		if(bannedWords[i] != "" && message.content.toLowerCase().indexOf(bannedWords[i]) != -1) {
			message.delete();
				
			client.commands["warn"].warnFn(client, message, args, db, 
				message.author, client.user.id, "Automod: Banned Words");

			return;
		}
	}
}

module.exports = {
	moduleFn: bannedwords
};