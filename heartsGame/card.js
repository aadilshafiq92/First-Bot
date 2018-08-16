const Backbone = require("backbone");
module.exports = Backbone.Model.extend({
  initialize: function(args) {
    this.set("face", args.face);
    this.set("value", args.value);
    this.set("id", "" + args.value + args.face)
    this.set("order", args.order)
  },

  /**
   * Returns score for points
   */
  getScore: function(){
  //TODO
  },

  getFace: function(){
    return this.get("face");
  },

  getValue: function(){
    return this.get("value");
  },

  getID: function(){
    return this.get("id");
  },

  getOrder: function(){
    return this.get("order");
  },

  isHearts: function(){
    if(this.get("face") === "hearts"){
      return true;
    }
    else{
      return false;
    }
  },

  isQoS: function(){
    if(this.get("face") === "spades" && this.get("value") === "queen"){
      return true;
    }
    else{
      return false;
    }

  },
});
