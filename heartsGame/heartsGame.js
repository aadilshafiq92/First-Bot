const utils = require('../utils.js');
const Discord = require("discord.js");
const Deck = require("./deck.js");
const Player = require("./player.js");
const PlayGroup = require("./PlayGroup.js");
const Board = require("./board.js");
const _ = require("underscore");

var dealersDeck = new Deck;
var playGroup = new PlayGroup;
var gameBoard = new Board;
var game = true;
var turn = 0;

module.exports = {
  parse: async function(message) {
    var textChannel = message.channel;
    if (utils.command(message.content, "hg-start")) {
      //resetting the main deck and everyone's hands
      game = true;
      gameBoard.restartTurns();
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

    else if (utils.command(message.content, "getDeck")) {
      if (game) {
        var found = false;
        playGroup.each(function(player) {
          if (message.member.id === player.get("user").id) {
            found = true;
            player.sendDMEmbed(player.showDeck());
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
      if (game)
      {
        var found = false;
        playGroup.each(function(player) {
          if (message.member.id === player.get("user").id) {
            found = true;
            if (message.member.id === playGroup.playing().getUser().id){
              var res = message.content.replace("!play", "").trim();
              if(player.hasCard(res)){
                gameBoard.play(player.getCard(res), playGroup, message);

                if(gameBoard.isGameOver(playGroup, message)){
                  dealersDeck.newDeck();
                  playGroup.each(function(player) {
                    for (var i = 0; i < 13; i++) {
                      player.dealCards(dealersDeck.getRandomCard());
                    }
                  });
                  playGroup.firstHand(message);
                  return true;
                  return message.channel.send("The game is stopped");
                }
              }
              else{
                return message.channel.send("You do not have that card")
              }
            }
            else {
              return message.channel.send("It is not your turn");
            }
          }
        });
        if (!found) {
          return message.channel.send("You are not currently in this game");
        }
      }
      else {
          return message.channel.send("There is currently no game");
      }
    }

    return false;
  }
};
