///////////////////////////////////////////////
// Overwatcher Bot
// Copyright (c) 2020 Ayush Bardhan Tripathy
// See LICENSE.md for additional info.
///////////////////////////////////////////////

const process = require("process");

module.exports = {
	token: process.env.OVRBOT_CLIENT_TOKEN,
	owner: process.env.OVRBOT_OWNER_ID,
	prefix: "over",
	roles: ["muted"],
	channels: ["logs", "botspam"]
};