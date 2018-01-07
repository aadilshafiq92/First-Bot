const Backbone = require("backbone");
const Deck = require("./deck.js");

module.exports = Backbone.Model.extend({
  defaults: {
      deck:  new Deck,
      hand:  new Deck
    },

  initialize: function(args) {
      this.set("user", args.user)
  },
  dealCards: function(card){
    this.get("hand").add(card);
  },

  sendDM: function(content){
    if(this.get("user").dmChannel === null){
      this.get("user").createDM()
        .then(function (dmChannel){
          dmChannel.send(content);
        }
        );
        console.log("Creating a channel");
    }
    else {
      this.get("user").dmChannel.send(content);
      console.log("Channel exists");
    }
  }

});
