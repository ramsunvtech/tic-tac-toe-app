// Player View

define([
  'view/shared/Base',
  'model/GamePlayer',
  'text!templates/player-form.html'
], function (BaseView, GamePlayerModel, playerTpl) {

  'use strict';

  return BaseView.extend({

    el: $('main'),

    template: playerTpl,

    model: new GamePlayerModel(),

    events: {
      'click #start': 'startGame',
      'click #clear': 'clearHistory'
    },

    // Setting the data to Model and save Item for moving to Local Storage.
    save: function () {
      this.model.set({
        "crossPlayerName": this.$('#crossPlayerName').val(),
        "noughtPlayerName": this.$('#noughtPlayerName').val()
      });
      this.model.saveItem();
    },

    // Save it to the Model and redirect to Game Page.
    startGame: function () {
      this.save();

      Backbone.history.navigate('game', {
        trigger: true
      });
    },

    // Clear all the Games Results and Refresh the Home.
    clearHistory: function () {
      localStorage.clear();
      location.reload();
    },

    // Passing the Player Names to Template.
    templateHelpers: function () {
      return {
        "crossPlayerName": this.model.get('crossPlayerName'),
        "noughtPlayerName": this.model.get('noughtPlayerName')
      }
    }

  });

});