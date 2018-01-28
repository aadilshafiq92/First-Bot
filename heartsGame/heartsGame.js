const utils = require('../utils.js');
const Discord = require("discord.js");
const Deck = require("./deck.js");
const Player = require("./player.js");
const PlayGroup = require("./PlayGroup.js");
const _ = require("underscore");

var dealersDeck = new Deck;
var playGroup = new PlayGroup;
var game = true;
var turn = 0;

module.exports = {
  parse: async function(message) {
    var textChannel = message.channel;
    if (utils.command(message.content, "hg-start")) {
      //resetting the main deck and everyone's hands
      game = true;
      turn = 1;
      dealersDeck.newDeck();
      playGroup = new PlayGroup;

      if (message.mentions.users.array().length < 4) {
        game = false;
        return message.channel.send("Not enough players");
      }

      //create players
      _.each(message.mentions.users.array(), function(user) {
        playGroup.add({
          user: user
        });
      })

      //deal cards
      playGroup.each(function(player) {
        for (var i = 0; i < 13; i++) {
          player.dealCards(dealersDeck.getRandomCard());
        }
      });

      //give players their initial hands
      playGroup.firstHand(message);
      return true;

    }

    //stops game
    else if (utils.command(message.content, "hg-stop")) {
      game = false;
      dealersDeck.newDeck();
      playGroup = new PlayGroup;
      return message.channel.send("The game is stopped");
    }

    //gives current hand
    else if (utils.command(message.content, "getHand")) {
      if (game) {
        var found = false;
        playGroup.each(function(player) {
          if (message.member.id === player.get("user").id) {
            found = true;
            player.sendDMEmbed(player.showHand());
          }
        });
        if (!found) {
          return message.channel.send("You are not currently in this game");
        }
      } else {
        {
          return message.channel.send("There is currently no game");
        }
      }
    }

    else if (utils.command(message.content, "play"))
    {

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
