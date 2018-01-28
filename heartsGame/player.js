const Discord = require("discord.js");
const Backbone = require("backbone");
const Deck = require("./deck.js");

module.exports = Backbone.Model.extend({
  /*defaults: {
      deck:  new Deck,
      hand:  new Deck
    },*/

  initialize: function(args) {
      this.set("deck", new Deck);
      this.set("hand", new Deck);
      this.set("user", args.user);
  },
  dealCards: function(card){
    this.get("hand").add(card);
  },

  getUser: function(){
    return this.get("user");
  },

  sendDM: function(content){
    if(this.get("user").dmChannel === null){
      this.get("user").createDM()
        .then(function (dmChannel){
          dmChannel.send(content);
        }
        );
        //console.log("Creating a channel");
    }
    else {
      this.get("user").dmChannel.send(content);
      //console.log("Channel exists");
    }
  },

  sendDMEmbed: function(content){
    if(this.get("user").dmChannel === null){
      this.get("user").createDM()
        .then(function (dmChannel){
          dmChannel.send("", content);
        }
        );
        //console.log("Creating a channel");
    }
    else {
      this.get("user").dmChannel.send("", content);
      //console.log("Channel exists");
    }
  },

  showHand: function(){
    var hand = "";

    this.get("hand").each(function(card){
      hand += "\n**" + card.getValue() + " of " + card.getFace() + "** \t(" + card.getID() + ")";
    })
    let embed = new Discord.RichEmbed()
      .setAuthor("Your deck")
      .setDescription(hand)
      .setColor("#9B59B6");
      // this.get("hand").each(function(card){
      //   embed.addField(card.getValue() + " of " + card.getFace(), card.getID());
      // });
    return embed;
  },

  hasStart: function(){
    var found = false;
    this.get("hand").each(function(card){
      if(card.getID() === "2club")
      {
        found = true;
      }
    })
    return found;
  }
});
