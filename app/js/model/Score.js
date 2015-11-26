// Score Model: Store all Games Result and compute Leader Board.

define([
  'model/shared/Base'
], function (BaseModel) {

  'use strict';

  return BaseModel.extend({

    localStorage: 'ScoreBoard',

    defaults: {
      result: []
    },

    /**
     *  Get all the Games Result which has replicated Item as per player wins.
     *  Grouping by Player Name and Map it to sum the Points.
     */
    getScoreList: function () {
      var result = this.get('result'),
          groups = _(result).groupBy('playerName');
          scoreList = [];

      scoreList = _(groups).map( function (g, key) {
        return { 
           playerName: key, 
           points: _(g).reduce(function(m,x) { 
             return m + x.points;
           }, 0)
        };
      });

      return _.sortBy(scoreList, 'points').reverse();
    },


    /**
     *  Push the New Game Result to the Game Result History.
     */
    setScore: function (details) {
      var scoreResult = this.get('result');
      scoreResult.push(details);
      this.set(scoreResult);
    }

  });

});