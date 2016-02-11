// Filename: router.js
define([
  'backbone',
  'view/Header',
  'view/Player',
  'view/LeaderBoard',
  'view/Game'
], function(Backbone, HeaderView, PlayerView, LeaderBoardView, GameView) {

   var appRouter = Backbone.Router.extend({
      routes: {
        // Define some URL routes
        '': 'home',
        'game': 'game'
      }
   });

  var initialize = function(){

    var AppRouter = new appRouter;
       
    AppRouter.on('route:home', function(){
      new HeaderView().render();
      new PlayerView().render();
      new LeaderBoardView().render();
    });

    AppRouter.on('route:game', function(){
      new GameView().render();
    });

    Backbone.history.start();
  };

  return { 
    initialize: initialize
  };
});