const botsettings = require("./config.json");
const Discord = require("discord.js");
const prefix = botsettings.prefix;
const testmodule = require("./testmodule.js")
const hearts = require("./heartsGame/heartsGame.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () =>
{
	console.log(`Bot is ready! ${bot.user.username}`);
	/*bot.generateInvite(["ADMINISTRATOR"]).then(link =>
	{
		console.log(link);
	}).catch(err =>
	{
		console.log(err.stack);
	};
	console.log("hello 2");*/

	try {
		let link = await bot.generateInvite(["ADMINISTRATOR"]);
		console.log(link);
	} catch(e){
		console.log(e.stack);
	}


});

bot.on("message", async message =>
{
	if (message.author.bot) return; //will return if messaged by bot
	if (message.channel.type === "dm") return; //will return if in a dm
	if (hearts.parse(message)) return;
	if (testmodule.parse(message)) return;
});

bot.login(botsettings.token);
