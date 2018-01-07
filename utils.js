const config = require("./config.json");
const _ = require("underscore");

module.exports = {
  // Will check if the sent command is in the message
  command: function (message="", command="") {
    if (typeof command === "object") {
      var found = false;
      _.each(command, function (item){
        if (message.toLowerCase().indexOf(config.commandPrefix + item.toLowerCase()) === 0) {
          found = true;
        }
      });
      return found;
    }
    else {
      return message.toLowerCase().indexOf(config.commandPrefix + command.toLowerCase()) === 0;
    }
  },

  /**
   * Will check if the sent guild id is in one of the main guilds.
   *  @param guildId
   */
  isMainGuild: function (guildId) {
      return _.contains(config.guildId, guildId)
  },

  getTextChannel: function (guild) {
    var channels = guild.channels;
    for (var [key, value] of channels) {
      if (value.type === 'text') {
        return value;
      }
    }
    return null;
  },

  getLargestVoiceChannel: function (guild) {
    var channels = guild.channels;
    var channel;
    var countMax = 0;
    for (var [key, value] of channels) {
      if (value.type === 'voice') {
        if (channel === undefined) {
          channel = value;
        }
        // Count members in channel
        var count = 0;
        for (var [key, value2] of value.members) {
          count++;
        }
        if (count > countMax) {
          channel = value;
          countMax = count;
        }
      }
    }
    return channel;
  }
};
