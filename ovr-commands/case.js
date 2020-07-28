///////////////////////////////////////////////
// Overwatcher Bot
// Copyright (c) 2020 Ayush Bardhan Tripathy
// See LICENSE.md for additional info.
///////////////////////////////////////////////

const common = require("../common.js");

function caseFn(client, message, args, db) {
	var data = db.getData("/" + message.guild.id + "/cases/" + args[1] + "/");
			
	common.sendEmbed(message, "Case: " + args[1], 
		"**Type**: " + data.type + "\n" +
		"**User**: <@" + data.user + "> *(" + data.user + ")*\n" + 
		"**Reason**: " + data.reason + "\n" +
		"**Staff**: <@" + data.staff + "> *(" + data.staff + ")*\n" +
		"**Time**: " + data.time);
}

module.exports = {
	name: "case",
	command: caseFn
};