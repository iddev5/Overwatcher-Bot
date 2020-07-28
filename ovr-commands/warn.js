///////////////////////////////////////////////
// Overwatcher Bot
// Copyright (c) 2020 Ayush Bardhan Tripathy
// See LICENSE.md for additional info.
///////////////////////////////////////////////

const Discord = require("discord.js");
const common = require("../common.js");

function warnFn(client, message, args, db, person, staff, reason) {
	const cases = db.getData("/" + message.guild.id + "/caseCount");
			
	db.push("/" + message.guild.id + "/caseCount", cases + 1);
	db.push("/" + message.guild.id + "/cases/" + cases + "/", 
		{ type: "warning", user: person.id, reason: reason, staff: staff, time: common.getTime() });
	
	common.sendEmbed(message.channel, person.username + " has been warned!", "**Reason**: *" + reason + "*");
}

function warn(client, message, args, db) {
	warnFn(client, message, args, db, message.mentions.users.first(), 
		   message.author.id, (args.splice(0, 2), args.join(" ")));
}

module.exports = {
	name: "warn",
	command: warn,
	warnFn: warnFn
};