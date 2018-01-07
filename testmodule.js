const utils = require('./utils.js');
const Discord = require("discord.js");

module.exports = {
  parse: async function (message) {
    var textChannel = message.channel;
    console.log("We just got into the function")

    //if(command === `${prefix}userinfo`)
    if (utils.command(message.content, "userinfo"))
      {
        console.log("We got into userinfo")
        //console.log("THIS IS WORKING");
        let embed = new Discord.RichEmbed()
          .setAuthor(message.author.username)
          .setDescription("This is the user's info!")
          .setColor("#9B59B6")
          .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
          .addField("ID", message.author.id)
          .addField("Created At", message.author.createdAt);

        message.channel.sendEmbed(embed);

        return true;
      }
    //if(command === `${prefix}mute`)
    else if (utils.command(message.content, "mute"))
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

        return true;
      }
      //if(command === `${prefix}unmute`)
      else if(utils.command(message.content, "unmute"))
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

        return true;
      }
    return false;
  }
};
