define([
  'model/Base'
], function (BaseModel) {

  return BaseModel.extend({

    localStorage: 'ScoreBoard',

    defaults: {
      result: []
    },

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

    setScore: function (details) {
      var scoreResult = this.get('result');
      scoreResult.push(details);
      this.set(scoreResult);
    }

  });

});