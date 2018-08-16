const Player = require("./player.js")
const Backbone = require("backbone");

module.exports = Backbone.Collection.extend({
  model: Player,
  currentPlayer: undefined,

  firstHand: function(message) {
    for (var i = 0; i < this.models.length; i++) {
      this.models[i].sendDM("You are now in a Hearts game");
      this.models[i].sendDMEmbed(this.models[i].showHand());
      if (this.models[i].hasStart()) {
        this.models[i].sendDM("You are the first player");
        message.channel.send(this.models[i].getUser().username + " is the first player.");
        this.currentPlayer = i;
      }
    }
  },

  playing: function()
  {
    return this.models[this.currentPlayer];
  },

  nextPlayer: function()
  {
    this.currentPlayer++;
    if(this.currentPlayer === this.models.length)
    {
      this.currentPlayer = 0;
    }
  },

  sortHands: function() {
  },

});
