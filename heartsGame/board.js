const Card = require("./card.js")
const Backbone = require("backbone");
const utils = require('../utils.js');
const Discord = require("discord.js");
const _ = require("underscore");

module.exports = Backbone.Collection.extend({

    heartsBroken: false,
    boardFace: "",
    highPlayer: undefined,
    highCard: undefined,
    shotTheMoon: undefined,
    turn: 0,
    gameTurn: 0,

    cardToBoard: function(card, playerGroup)
    {
      this.add(card);
      playerGroup.playing().removeCard(card);
    },

    newHighPlayer: function(card, playerGroup){
      console.log("newHighPlayer");
      console.log("Played card order is: " + card.getOrder() + " " + (typeof card.getOrder()));
      console.log("High card order is: " + this.highCard.getOrder() + " " + (typeof this.highCard.getOrder()));
      if(card.getOrder() > this.highCard.getOrder()){
        this.highCard = card;
        this.highPlayer = playerGroup.playing();
      console.log("New high card order is: " + this.highCard.getOrder());
      }
    },

    play: function(card, playerGroup, message){
      //Checking if board is empty
      if(this.gameTurn === 0){
        if(card.getID() != "2club"){
          message.channel.send("This is the first turn, you must play the 2 of clubs")
        }
        else{
          this.boardFace = card.getFace();
          this.cardToBoard(card, playerGroup);
          this.highPlayer = playerGroup.playing();
          this.highCard = card;
          this.turn++;
          this.gameTurn++;
          this.isRoundOver(playerGroup, message);
          return;
        }
      }
      else if(this.length === 0){
        if(card.getFace() === "hearts"){
          if(this.heartsBroken){
            this.boardFace = card.getFace();
            this.cardToBoard(card, playerGroup);
          }
          else {
            message.channel.send("Hearts are not broken");
            return;
          }
        }
        else{
          this.boardFace = card.getFace();
          this.cardToBoard(card, playerGroup);
        }
        this.highPlayer = playerGroup.playing();
        this.highCard = card;
        this.turn++;
        this.isRoundOver(playerGroup, message);
        return;
      }
      else{
        //get here if the board has cards in it and a face
        if(card.getFace() === this.boardFace){
          //get here if you are playing a card with the same face as the board
          this.newHighPlayer(card, playerGroup);
          this.cardToBoard(card, playerGroup);
          this.turn++;
          this.isRoundOver(playerGroup, message);
          return;
        }
        else if(playerGroup.playing().hasFace(this.boardFace)){
          //get here if you are trying to play a card different from the board face, but you have a card with the board face
          message.channel.send("You cannot play that, card must be " + this.boardFace)
          return;
        }
        else{
          //get here if you are trying to play a card different from the board face and don't have one
          if(card.getFace() === "hearts"){
            this.heartsBroken = true;
          }
          this.cardToBoard(card, playerGroup);
          this.turn++;
          this.isRoundOver(playerGroup, message);
          return;
        }
      }
    },

    isRoundOver: function(playerGroup, message){
      if (this.turn === 4){
        this.showBoard(message);
        this.score();
        this.highPlayer.get("deck").add(this.models);
        this.remove(this.models);
        this.turn = 0;
        message.channel.send("End of round, high player is " + this.highPlayer.getUser());
        if(this.heartsBroken){
          message.channel.send("Hearts are broken");
        }
        while(playerGroup.playing() != this.highPlayer){
          playerGroup.nextPlayer();
        }
        message.channel.send("New game. The first player is " + playerGroup.playing().getUser());
        this.gameTurn++;
        return;
      }
      else{
        playerGroup.nextPlayer();
        this.showBoard(message);
        message.channel.send("The player that played the high card this round is " + this.highPlayer.getUser());
        message.channel.send("The current player is " + playerGroup.playing().getUser());
        return;
      }
    },

    isGameOver: function(playerGroup, message){
      if(this.gameTurn === 13){
        this.setGameScore(playerGroup);
        for(var i = 0; i < playerGroup.length; i++){
          playerGroup.remove(playerGroup.playing)
        }
        this.restartTurns();

        var scores  = "";

        playerGroup.each(function(player){
          scores += "\n**" + player.get("user")+ "** \t(" + player.getTotalScore() + ")";
        })
        let embed = new Discord.RichEmbed()
          .setAuthor("Game Score")
          .setDescription(hand)
          .setColor("#9B59B6");
        return true;
      }
      else{
        return false;
      }
    },

    score: function(){
      for(var i = 0; i < this.length; i++){
        if(this.models[i].isHearts()){
          this.highPlayer.setRoundScore(1);
        }
        else if(this.models[i].isQos()){
          this.highPlayer.setRoundScore(13);
        }
      }
    },

    shootTheMoon: function(player){
      if(player.getRoundScore() === 26){
        this.shotTheMoon = player;
        return true;
      }
      else{
        return false;
      }
    },

    setGameScore: function(playerGroup){
      for(var i = 0; i < 4; i++)
      {
        if(this.shootTheMoon(playerGroup.playing())){
          playerGroup.nextPlayer();
          while(playerGroup.playing().get("user") != this.shotTheMoon.get("user"))
          {
            playerGroup.playing().setTotalScore(26);
            playerGroup.nextPlayer();
          }
          i = 4;
        }
      else{
        playerGroup.playing().setTotalScore(playerGroup.playing().getRoundScore());
        }
        playerGroup.nextPlayer();
      }
      return;
      }
    },

    restartTurns: function(){
      this.gameTurn = 0;
      return;
    },

    showBoard: function(message){
      var board = "";

      this.each(function(card){
        board += "\n**" + card.getValue() + " of " + card.getFace() + "** \t(" + card.getID() + ")";
      })
      let embed = new Discord.RichEmbed()
        .setAuthor("Cards on the Table")
        .setDescription(board)
        .setColor("#9B59B6");
      return message.channel.send(embed);
    },

});
