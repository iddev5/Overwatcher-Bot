///////////////////////////////////////////////
// Overwatcher Bot
// Copyright (c) 2020 Ayush Bardhan Tripathy
// See LICENSE.md for additional info.
///////////////////////////////////////////////

const common = require("../common")

function messageupdate(client, message, newmessage, db) {
	if(message.author.bot) return;
	
	var logs = db.getData("/" + message.guild.id + "/channels/logs");
	if(logs == -1) return;
	
	const channel = client.channels.cache.get(logs);
	common.sendEmbed(channel, "Message Updated", "<@" + message.author.id + ">'s message was updated in <#" + 
					 message.channel.id + ">\n\n" + "**Original Content**:\n" + message.content +
					 "\n\n**New Content**:\n" + newmessage.content);
}

module.exports = {
	eventFn: messageupdate
};