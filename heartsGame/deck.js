const Card = require("./card.js")
const Backbone = require("backbone");

module.exports = Backbone.Collection.extend({
  model: Card,

  newDeck: function(){
    this.reset();
    this.add(new Card({face: "club", value: "2"}));
    this.add(new Card({face: "club", value: "3"}));
    this.add(new Card({face: "club", value: "4"}));
    this.add(new Card({face: "club", value: "5"}));
    this.add(new Card({face: "club", value: "6"}));
    this.add(new Card({face: "club", value: "7"}));
    this.add(new Card({face: "club", value: "8"}));
    this.add(new Card({face: "club", value: "9"}));
    this.add(new Card({face: "club", value: "10"}));
    this.add(new Card({face: "club", value: "jack"}));
    this.add(new Card({face: "club", value: "queen"}));
    this.add(new Card({face: "club", value: "king"}));
    this.add(new Card({face: "club", value: "ace"}));
    this.add(new Card({face: "spades", value: "2"}));
    this.add(new Card({face: "spades", value: "3"}));
    this.add(new Card({face: "spades", value: "4"}));
    this.add(new Card({face: "spades", value: "5"}));
    this.add(new Card({face: "spades", value: "6"}));
    this.add(new Card({face: "spades", value: "7"}));
    this.add(new Card({face: "spades", value: "8"}));
    this.add(new Card({face: "spades", value: "9"}));
    this.add(new Card({face: "spades", value: "10"}));
    this.add(new Card({face: "spades", value: "jack"}));
    this.add(new Card({face: "spades", value: "queen"}));
    this.add(new Card({face: "spades", value: "king"}));
    this.add(new Card({face: "spades", value: "ace"}));
    this.add(new Card({face: "diamond", value: "2"}));
    this.add(new Card({face: "diamond", value: "3"}));
    this.add(new Card({face: "diamond", value: "4"}));
    this.add(new Card({face: "diamond", value: "5"}));
    this.add(new Card({face: "diamond", value: "6"}));
    this.add(new Card({face: "diamond", value: "7"}));
    this.add(new Card({face: "diamond", value: "8"}));
    this.add(new Card({face: "diamond", value: "9"}));
    this.add(new Card({face: "diamond", value: "10"}));
    this.add(new Card({face: "diamond", value: "jack"}));
    this.add(new Card({face: "diamond", value: "queen"}));
    this.add(new Card({face: "diamond", value: "king"}));
    this.add(new Card({face: "diamond", value: "ace"}));
    this.add(new Card({face: "hearts", value: "2"}));
    this.add(new Card({face: "hearts", value: "3"}));
    this.add(new Card({face: "hearts", value: "4"}));
    this.add(new Card({face: "hearts", value: "5"}));
    this.add(new Card({face: "hearts", value: "6"}));
    this.add(new Card({face: "hearts", value: "7"}));
    this.add(new Card({face: "hearts", value: "8"}));
    this.add(new Card({face: "hearts", value: "9"}));
    this.add(new Card({face: "hearts", value: "10"}));
    this.add(new Card({face: "hearts", value: "jack"}));
    this.add(new Card({face: "hearts", value: "queen"}));
    this.add(new Card({face: "hearts", value: "king"}));
    this.add(new Card({face: "hearts", value: "ace"}));
  },

  getRandomCard: function(){
    var index = Math.floor(Math.random() * Math.floor(this.size()));
    var card = this.models[index];
    this.remove(card);
    return card;
  },

  blankDeck: function()
  {
    var card = this.models[index];
    for(var i = 0; i < this.size(); i++)
    {
      this.remove(card);
    }
  }

});
