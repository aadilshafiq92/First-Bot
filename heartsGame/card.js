const Backbone = require("backbone");
module.exports = Backbone.Model.extend({
  initialize: function(args) {
    this.set("face", args.face);
    this.set("value", args.value);
    this.set("id", "" + args.value + args.face)
    this.set("order", "" + args.order)
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

  isHearts: function(){
    //TODO
  },

  isQoS: function(){
    //TODO
  },

});
