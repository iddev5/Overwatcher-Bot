///////////////////////////////////////////////
// Overwatcher Bot
// Copyright (c) 2020 Ayush Bardhan Tripathy
// See LICENSE.md for additional info.
///////////////////////////////////////////////

const common = require("../common")

function messagedelete(client, message, db) {
	if(message.author.bot) return;
	
	var logs = db.getData("/" + message.guild.id + "/channels/logs");
	if(logs == -1) return;
	
	const channel = client.channels.cache.get(logs);
	common.sendEmbed(channel, "Message Deleted", "<@" + message.author.id + ">'s message was deleted in <#" + 
					 message.channel.id + ">\n\n" + "**Original Content**:\n" + message.content);
}

module.exports = {
	eventFn: messagedelete
};