///////////////////////////////////////////////
// Overwatcher Bot
// Copyright (c) 2020 Ayush Bardhan Tripathy
// See LICENSE.md for additional info.
///////////////////////////////////////////////

const config = require("./config.js");

function setupServer(message, db) {
	const server = "/" + message.guild.id + "/";
	
	config.channels.forEach((el) => {
		db.push(server + "channels/" + el, -1);
	});
	
	config.roles.forEach((el) => {
		db.push(server + "roles/" + el, -1);
	});
	
	db.push(server + "permitteds/", []);
	
	db.push(server + "bannedWords/", []);
	
	db.push(server + "caseCount/", 0);
	db.push(server + "cases/", {});
	
	db.push(server + "users/", []);
}

function setupUser(message, db, id) {
	const user = "/" + message.guild.id + "/users/" + id + "/";
	
	db.push(user + "lastMsgTime", 0);
	db.push(user + "lastWarnTime", 0);
}

module.exports = {
	setupServer: setupServer,
	setupUser: setupUser
};