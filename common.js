const Discord = require("discord.js");

function randomColor() {
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}

function getTime() {
	const date = new Date();
	return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + ", " + 
		   date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(); 
}

function sendEmbed(channel, title, description) {
	const embed = new Discord.MessageEmbed();
	embed.setTitle(title);
	embed.setColor(randomColor());
	embed.setDescription(description);
	embed.setFooter(getTime());
			
	channel.send(embed);
}

module.exports = {
	randomColor: randomColor,
	getTime: getTime,
	sendEmbed: sendEmbed
};