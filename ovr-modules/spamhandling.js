///////////////////////////////////////////////
// Overwatcher Bot
// Copyright (c) 2020 Ayush Bardhan Tripathy
// See LICENSE.md for additional info.
///////////////////////////////////////////////

function spamhandling(client, message, args, db) {
	const currentTime = (new Date).getTime();
	var lastMsgTime  = db.getData("/" + message.guild.id + "/users/" + message.author.id + "/lastMsgTime");
	var	lastWarnTime = db.getData("/" + message.guild.id + "/users/" + message.author.id + "/lastWarnTime");
		
	if(lastMsgTime != 0) {
		const timeDef = currentTime - lastMsgTime;
			
		if(timeDef < 700) {
			message.delete();
				
			if(currentTime - lastWarnTime > 7000) {
				client.commands["warn"].warnFn(client, message, args, db, message.author, client.user.id, "Automod: Spamming"); 
				db.push("/" + message.guild.id + "/users/" + message.author.id + "/lastWarnTime", currentTime);
			}
			
			return;
		}
	}
	
	db.push("/" + message.guild.id + "/users/" + message.author.id + "/lastMsgTime", currentTime);
}

module.exports = {
	moduleFn: spamhandling
};