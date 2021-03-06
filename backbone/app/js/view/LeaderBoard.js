// Leader Board

define([
  'view/shared/Base',
  'model/Score',
  'text!templates/leader-board.html'
], function (BaseView, ScoreModel, leaderBoardTpl) {

  'use strict';

  return BaseView.extend({

    el: $('summary'),

    template: leaderBoardTpl,

    model: new ScoreModel(),

    templateHelpers: function () {
      return {
        "score": this.model.getScoreList()
      };
    }

  });

});