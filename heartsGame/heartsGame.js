const utils = require('../utils.js');
const Discord = require("discord.js");
const Deck = require("./deck.js");
const Player = require("./player.js")
const _ = require("underscore");

var dealersDeck = new Deck;
var players = [];
var game = true;

module.exports = {
  parse: async function(message) {
    var textChannel = message.channel;
    if (utils.command(message.content, "hg-start")) {
      game = true;
      //resetting the main deck and everyone's hands
      dealersDeck.newDeck();
      players = [];
      if (message.mentions.users.array().length < 4) {
        //return message.channel.sendMessage("Not enough players");
      }
      var count = 0;
      //create players
      _.each(message.mentions.users.array(), function(user) {
        players[count] = new Player({
          user: user
        });
        count++;
      })
      //deal cards
      for (var x = 0; x < players.length; x++) {
        for (var i = 0; i < 13; i++) {
          players[x].dealCards(dealersDeck.getRandomCard());
        }
      }
      //give players their initial hands
      for (var i = 0; i < players.length; i++) {
        players[i].sendDM("You are now in a Hearts game");

        players[i].sendDMEmbed(players[i].showHand());
      }
      //for(var i = 0;)
      //console.log(players[0].get("hand"));
      return true;
    } else if (utils.command(message.content, "hg-stop")) {
      game = false;
      dealersDeck.newDeck();
      players = [];
      return message.channel.sendMessage("The game is stopped");

    }
    //gives current hand
    else if (utils.command(message.content, "getHand")) {
      //console.log(message.member.id)
      if (game) {
        for (var i = 0; i <= players.length; i++) {
          if (i === players.length) {
            message.member.send("You aren't in this game")
            return;
          } else if (message.member.id === players[i].get("user").id) {
            players[i].sendDMEmbed(players[i].showHand());
            return;
          }
          //console.log(players[i].get("user").id);
        }
      } else {
        {
          return message.channel.sendMessage("There is currently no game");
        }
      }
    }
    /*
    Commands:

    Board
      -Show what's on the Board
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
