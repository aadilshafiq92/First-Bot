const Card = require("./card.js")
const Backbone = require("backbone");

module.exports = Backbone.Collection.extend({
  model: Card,
  comparator: "order",

  newDeck: function(){
    this.reset();
    this.add(new Card({face: "club", value: "2", order: 1}));
    this.add(new Card({face: "club", value: "3", order: 2}));
    this.add(new Card({face: "club", value: "4", order: 3}));
    this.add(new Card({face: "club", value: "5", order: 4}));
    this.add(new Card({face: "club", value: "6", order: 5}));
    this.add(new Card({face: "club", value: "7", order: 6}));
    this.add(new Card({face: "club", value: "8", order: 7}));
    this.add(new Card({face: "club", value: "9", order: 8}));
    this.add(new Card({face: "club", value: "10", order: 9}));
    this.add(new Card({face: "club", value: "jack", order: 10}));
    this.add(new Card({face: "club", value: "queen", order: 11}));
    this.add(new Card({face: "club", value: "king", order: 12}));
    this.add(new Card({face: "club", value: "ace", order: 13}));
    this.add(new Card({face: "spades", value: "2", order: 14}));
    this.add(new Card({face: "spades", value: "3", order: 15}));
    this.add(new Card({face: "spades", value: "4", order: 16}));
    this.add(new Card({face: "spades", value: "5", order: 17}));
    this.add(new Card({face: "spades", value: "6", order: 18}));
    this.add(new Card({face: "spades", value: "7", order: 19}));
    this.add(new Card({face: "spades", value: "8", order: 20}));
    this.add(new Card({face: "spades", value: "9", order: 21}));
    this.add(new Card({face: "spades", value: "10", order: 22}));
    this.add(new Card({face: "spades", value: "jack", order: 23}));
    this.add(new Card({face: "spades", value: "queen", order: 24}));
    this.add(new Card({face: "spades", value: "king", order: 25}));
    this.add(new Card({face: "spades", value: "ace", order: 26}));
    this.add(new Card({face: "diamond", value: "2", order: 27}));
    this.add(new Card({face: "diamond", value: "3", order: 28}));
    this.add(new Card({face: "diamond", value: "4", order: 29}));
    this.add(new Card({face: "diamond", value: "5", order: 30}));
    this.add(new Card({face: "diamond", value: "6", order: 31}));
    this.add(new Card({face: "diamond", value: "7", order: 32}));
    this.add(new Card({face: "diamond", value: "8", order: 33}));
    this.add(new Card({face: "diamond", value: "9", order: 34}));
    this.add(new Card({face: "diamond", value: "10", order: 35}));
    this.add(new Card({face: "diamond", value: "jack", order: 36}));
    this.add(new Card({face: "diamond", value: "queen", order: 37}));
    this.add(new Card({face: "diamond", value: "king", order: 38}));
    this.add(new Card({face: "diamond", value: "ace", order: 39}));
    this.add(new Card({face: "hearts", value: "2", order: 40}));
    this.add(new Card({face: "hearts", value: "3", order: 41}));
    this.add(new Card({face: "hearts", value: "4", order: 42}));
    this.add(new Card({face: "hearts", value: "5", order: 43}));
    this.add(new Card({face: "hearts", value: "6", order: 44}));
    this.add(new Card({face: "hearts", value: "7", order: 45}));
    this.add(new Card({face: "hearts", value: "8", order: 46}));
    this.add(new Card({face: "hearts", value: "9", order: 47}));
    this.add(new Card({face: "hearts", value: "10", order: 48}));
    this.add(new Card({face: "hearts", value: "jack", order: 49}));
    this.add(new Card({face: "hearts", value: "queen", order: 50}));
    this.add(new Card({face: "hearts", value: "king", order: 51}));
    this.add(new Card({face: "hearts", value: "ace", order: 52}));
  },

  getRandomCard: function(){
    var index = Math.floor(Math.random() * Math.floor(this.size()));
    var card = this.models[index];
    this.remove(card);
    return card;
  },

});
