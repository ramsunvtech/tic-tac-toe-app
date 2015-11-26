define([
  'view/shared/Base',
  'model/GamePlayer',
  'text!templates/player-form.html'
], function (BaseView, GamePlayerModel, playerTpl) {

  return BaseView.extend({

    el: $('main'),

    template: playerTpl,

    model: new GamePlayerModel(),

    events: {
      'click #start': 'startGame',
      'click #clear': 'clearHistory'
    },

    save: function () {
      this.model.set({
        "crossPlayerName": this.$('#crossPlayerName').val(),
        "noughtPlayerName": this.$('#noughtPlayerName').val()
      });
      this.model.saveItem();
    },

    startGame: function () {
      this.save();

      Backbone.history.navigate('game', {
        trigger: true
      });
    },

    clearHistory: function () {
      localStorage.clear();
      location.reload();
    },

    templateHelpers: function () {
      return {
        "crossPlayerName": this.model.get('crossPlayerName'),
        "noughtPlayerName": this.model.get('noughtPlayerName')
      }
    }

  });

});