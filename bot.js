const botsettings = require("./config.json");
const Discord = require("discord.js");
const prefix = botsettings.prefix;

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
	if(message.author.bot) return; //will return if messaged by bot
	if(message.channel.type === "dm") return; //will return if in a dm

	let messageArray = message.content.split(" ");	//scans message for spaces
	let command = messageArray[0];
	let args = messageArray.slice(1);

	console.log(messageArray);
	console.log(command);
	console.log(args);

	if(!command.startsWith(prefix)) return;

	if(command === `${prefix}userinfo`)
		{
			//console.log("THIS IS WORKING");
			let embed = new Discord.RichEmbed()
				.setAuthor(message.author.username)
				.setDescription("This is the user's info!")
				.setColor("#9B59B6")
				.addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
				.addField("ID", message.author.id)
				.addField("Created At", message.author.createdAt);

			message.channel.sendEmbed(embed);

			return;
		}
	if(command === `${prefix}mute`)
		{
			//Check if command executor has the right permission to do this command
			if(!message.member.hasPermission("MANAGE_MESSAGES"))
			{
				return message.channel.sendMessage("You do not have manage message");
			}

			//Get the mentioned user, return if there is none
			let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
			if(!toMute)
			{
				return message.channel.sendMessage("You did not specify a user to mention!");
			}

			//If the mutee has the same or higher role than the muter, return
			if(toMute.id === message.author.id)
			{
				return message.channel.sendMessage("You cannot mute yourself.");
			}

			if(toMute.highestRole.position >= message.member.highestRole.position)
			{
				return message.channel.sendMessage("You cannot mute a member who is higher or has the same role as you");
			}


			let role = message.guild.roles.find(r => r.name === "Muted By Bot");
			if(!role){
			try
			{
				role = await message.guild.createRole({
					name: "Muted By Bot",
					color: "#000000",
					permissions: []
				});

				message.guild.channels.forEach(async (channel, id) => {
					await channel.overwritePermissions(role, {
							SEND_MESSAGES: false,
							ADD_REACTIONS: false
					});
				});
			}
			catch(e)
			{
				console.log(e.stack);
			}}

			if(toMute.roles.has(role.id))
			{
				return message.channel.sendMessage("This user is already muted!");
			}

			await toMute.addRole(role);
			message.channel.sendMessage("I have muted them.")

			return;
		}
		if(command === `${prefix}unmute`)
		{
			//Check if command executor has the right permission to do this command
			if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have manage message");

			//Get the mentioned user, return if there is none
			let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
			if(!toMute) return message.channel.sendMessage("You did not specify a user to mention!");

			//If the mutee has the same or higher role than the muter, return
			if(toMute.id === message.author.id)
			{
				return message.channel.sendMessage("You cannot mute yourself.");
			}

			if(toMute.highestRole.position >= message.member.highestRole.position)
			{
				return message.channel.sendMessage("You cannot mute a member who is higher or has the same role as you");
			}

			let role = message.guild.roles.find(r => r.name === "Muted By Bot");

			if(!role || !toMute.roles.has(role.id))
			{
				return message.channel.sendMessage("This user is already muted!");
			}

			await toMute.removeRole(role);
			message.channel.sendMessage("I have unmuted them.")

			return;
		}
});

bot.login(botsettings.token);
