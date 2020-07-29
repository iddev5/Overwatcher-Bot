///////////////////////////////////////////////
// Overwatcher Bot
// Copyright (c) 2020 Ayush Bardhan Tripathy
// See LICENSE.md for additional info.
///////////////////////////////////////////////

const fs = require("fs");

const Discord = require("discord.js");
const client = new Discord.Client();

const JsonDB = require("node-json-db").JsonDB;
const ConfigDB = require("node-json-db/dist/lib/JsonDBConfig").Config; 
var db = new JsonDB(new ConfigDB("db", true, true, "/"));

const common = require("./common.js");
const config = require("./config.js");
const setup  = require("./setup.js"); 

client.commands = [];

client.commands["add"] = loadCommand("add");
client.commands["allow"] = loadCommand("allow");
client.commands["case"] = loadCommand("case");
client.commands["remove"] = loadCommand("remove");
client.commands["setchannel"] = loadCommand("setchannel");
client.commands["setrole"] = loadCommand("setrole");
client.commands["warn"] = loadCommand("warn");

client.modules = [];

client.modules.push(loadModule("bannedwords"));
client.modules.push(loadModule("spamhandling"));

client.events = [];

client.events["messagedelete"] = loadEvent("messagedelete");
client.events["messageupdate"] = loadEvent("messageupdate");

client.on("ready", () => {
    console.log('Overwatcher Bot ready!');
});

client.on("guildCreate", message => {
	setup.setupServer(message, db);
});

client.on("message", message => {
    if(message.author.bot) return;
    
	const isBotCommand = (message.content.indexOf(config.prefix) == 0) && 
						 (message.content.indexOf(" ") == config.prefix.length);
	
	if(isBotCommand) {
		var args = message.content.split(' ').slice(1);
	
		const cmd = args[0].toLowerCase();
		
		//const isOwner = client.fetchApplication().owner.id == message.author.id;
		const isOwner = message.author.id == config.owner;
		
		////////////////////////////////////////////
		// Built-in commands
		////////////////////////////////////////////
		
		if(isOwner) {
			if(cmd == "reload") {
				const module = "./ovr-commands/" + args[1] + ".js";
				
				delete require.cache[require.resolve(module)];
				client.commands[args[1]] = require(module);
				
				common.sendEmbed(message.channel, "Reloaded", `**${args[1]}**`);
				
				return;
			}
			else if(cmd == "setupserver") {
				setup.setupServer(message, db);

				return;
			}
			else if(cmd == "setupuser") {
				const user = message.mentions.users.first();
				setup.setupUser(message, db, user.id);
				
				return;
			}
		}
		
		////////////////////////////////////////////
		// Handle commands
		////////////////////////////////////////////
		
		const permittedRoles = db.getData("/" + message.guild.id + "/permitteds/"); console.log(permittedRoles);
		var isAdmin = false;
		permittedRoles.forEach( (el) => {
			if(isAdmin) return;
			if(message.member.roles.cache.has(el)) isAdmin = true;
		});
		
		if(isOwner || isAdmin) {
			try { client.commands[cmd].command(client, message, args, db); }
			catch { console.log("Unknown command: " + cmd); }
		}
	}
	else {
		////////////////////////////////////////////
		// Setup the user if not already done
		////////////////////////////////////////////
		
		try {
			db.getData("/" + message.guild.id + "/users/" + message.author.id + "/lastMsgTime");
		}
		catch {
			setup.setupUser(message, db, message.author.id);
		}
		
		////////////////////////////////////////////
		// Handle modules
		////////////////////////////////////////////
		
		for(var i = 0; i < client.modules.length; i++) {
			client.modules[i].moduleFn(client, message, args, db);
		}
	}
});

client.on("messageDelete", message => {
	client.events["messagedelete"].eventFn(client, message, db);
});

client.on("messageUpdate", (oldMessage, newMessage) => {
	client.events["messageupdate"].eventFn(client, oldMessage, newMessage, db);
});

client.on("messageReactionAdd", (messageReaction, user) => {
	
});

client.login(config.token);

function loadCommand(name) {
	return require("./ovr-commands/" + name + ".js");
}

function loadModule(name) {
	return require("./ovr-modules/" + name + ".js");
}

function loadEvent(name) {
	return require("./ovr-events/" + name + ".js");
}