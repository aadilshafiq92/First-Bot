const Discord = require("discord.js");
const Backbone = require("backbone");
const Deck = require("./deck.js");

module.exports = Backbone.Model.extend({
  /*defaults: {
      deck:  new Deck,
      hand:  new Deck
    },*/

  roundScore: 0;
  totalScore: 0;

  initialize: function(args) {
      this.set("deck", new Deck);
      this.set("hand", new Deck);
      this.set("user", args.user);
  },
  dealCards: function(card){
    this.get("hand").add(card);
  },
  removeCard: function(card){
    this.get("hand").remove(card);
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

  showDeck: function(){
    var deck = "";

    this.get("deck").each(function(card){
      deck += "\n**" + card.getValue() + " of " + card.getFace() + "** \t(" + card.getID() + ")";
    })
    let embed = new Discord.RichEmbed()
      .setAuthor("Cards you've earned")
      .setDescription(deck)
      .setColor("#9B59B6");
    return embed;
  },

  hasCard: function(value){
    var found = false;
    this.get("hand").each(function(card){
      if(card.getID() === value)
      {
        found = true;
      }
    })
    return found;
  },

  hasFace: function(value){
    var found = false;
    this.get("hand").each(function(card){
      if(card.getFace() === value)
      {
        found = true;
      }
    })
    return found;
  },

  getCard: function(value){
    var found;
    this.get("hand").each(function(card){
      if(card.getID() === value)
      {
        found = card;
      }
    })
    return found;
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
  },

  setRoundScore: function(newScore){
    this.roundScore = this.roundScore + newScore;
    return;
  },

  setTotalScore: function(newScore){
    this.totalScore = this.totalScore + newScore;
    return;
  },

  getRoundScore: function(){
    return this.roundScore;
  },

  getTotalScore: function(){
    return this.totalScore;
  },
});
