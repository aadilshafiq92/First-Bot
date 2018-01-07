const utils = require('../utils.js');
const Discord = require("discord.js");
const Deck = require("./deck.js");
const Player = require("./player.js")
const _ = require("underscore");

var dealersDeck = new Deck;
var players = [];

module.exports = {
  parse: async function (message) {
    var textChannel = message.channel;
    if (utils.command(message.content, "hg-start")) {
      dealersDeck.newDeck();
      players = [];
      if(message.mentions.users.array().length < 4){
        //return message.channel.sendMessage("Not enough players");
      }
      var count = 0;
      _.each(message.mentions.users.array(), function(user){
        players[count] = new Player({user: user});
        count++;
      })
      for(var i = 0; i < 13; i++){
        for(var x = 0; x < players.length; x++){
          players[x].dealCards(dealersDeck.getRandomCard());
        }
      }
      for (var i = 0; i < players.length; i++){
          players[i].sendDM("Hi");
        }
      //for(var i = 0;)
      //console.log(players[0].get("hand"));



      return true;
    }
    /*
    Commands:

    Start
      -Stop, take in four @s, make deck, deal out hands
    Stop
      -Put the game in a blank state
    Board
      -Show what's on the Board
    Hand
      -DM your current hand
    Play
      - Lets a user play a card. can either do it by id or index.
      - does not let invalid plays. Either the user that is not their turn
      or a card they can not play.
    info
      - Prints out current game state. Includes if hearts are broken

    Models:
        Deck
            - Holds cards.
        card
            - Has an id, face, number
        Player
            - Has a deck, deck to hold cards won in turns, user

    Other:

    - Variable for each of the four players
    - variable for deck to sort from
    - Variable for deck on table

    Functions:

      Deal
      Clear
      Play
        -Go through player's deck
        -Check if they have card called
        -Put card in table Deck

    */
    return false;
  }
};
