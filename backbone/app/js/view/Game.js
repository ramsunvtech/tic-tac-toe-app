// Tic Tac Toe Game View

define([
  'view/shared/Base',
  'model/Score',
  'model/GamePlayer',
  'text!templates/game.html'
], function (BaseView, ScoreModel, PlayerModel, gameTpl) {

  'use strict';

  return BaseView.extend({

    el: $('main'),

    scoreModel: new ScoreModel(),

    model: new PlayerModel(),

    events: {
      'click .cell.empty': 'tick',
      'click #back': 'goBack'
    },

    // View Properties.
      // Player Class Name and their Id.
      crossPlayerId: 'player1',
      noughtPlayerId: 'player2',
      currentPlayer: 1,
      currentPlayerClass: '',
      cellClassList: '',
      playerClass: ['player cross-player', 'player nought-player'],
      playerAttribute: ['crossPlayerName', 'noughtPlayerName'],

      // Minimum and Maximum Clicks to do Combination Check.
      minimumClicks: 4,
      maximumClicks: 9,

      // Game Result
      isCrossWin: false,
      isNoughtWin: false,
      isDraw: false,
    
      // Message Properties.
      gameResult: '',
      winner: '',

      // Winning Positions for 3X3.
      // We can use formulae to generate this multi dimensional array as well.
      winCombinations: [
        // Horizontal
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],

        // Vertical
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],

        // Diagonal Win
        [3, 5, 7],
        [1, 5, 9]
      ],

    // Go back to Home.
    goBack: function () {
      window.location = 'index.html';
    },

    /**
     *  Game View Initializing ...
     *  Empty the Header and Summary Block.
     */
    initialize: function () {
      $('header, summary').html('');

      this.currentPlayerClass = this.crossPlayerId;
      this.cellClassList = 'column selected ' + this.crossPlayerId;
      this.model.initialize();
    },

    // Check to start check Winning Combination.
    canCheckForResult: function () {
      return ( this.$('input.cell:checked').length > this.minimumClicks );
    },

    // Get the clicked positions by Player Wise.
    getPositions: function (playerCellClass) {
      var positions = $('input.cell:checked.' + playerCellClass).map(function () {
        return parseInt(this.value);
      }).get();
      return positions;
    },

    // Get the Cross Player's clicked positions.
    getCrossPositions: function () {
      return this.getPositions(this.crossPlayerId);
    },

    // Get the Nought Player's clicked positions.
    getNoughtPositions: function () {
      return this.getPositions(this.noughtPlayerId);
    },

    // Check whether the Game is over.
    isGameOver: function () {
      return ( this.$('input.cell:checked').length == this.maximumClicks );
    },

    // Show the Message for the Game Result.
    showMessage: function () {
      var message = (this.winner) ? 'Congratultion ' + this.winner + '! \n You Won' 
          : this.gameResult + this.winner;
      alert(message);

      this.goBack();
    },

    /**
     *  Iterate every winning Combination to end the Game.
     *  If Cross / Nought Player has won then store it to the Game Result History.
     *  If Match is drawan, don't add it in the Game Result History.
     *  Show the Message for Game Result.
     *  Redirect to Home.
     */
    iterateCombinations: function () {
      var _this = this,
          result = 'Won By ',
          player = '',
          isGameEnded = false,
          crossPlayerName = this.model.get('crossPlayerName'),
          noughtPlayerName = this.model.get('noughtPlayerName'),
          $result = this.$('div.result');

      _.each(this.winCombinations, function(value) {
        var crossDifference = _.difference( value, _this.getCrossPositions() );
        _this.isCrossWin = _.isEmpty(crossDifference);

        if( _this.isCrossWin ) {
          $result.find('.type').text(result);
          $result.find('.name').text( crossPlayerName );
          player = crossPlayerName;
          isGameEnded = true;

          _this.scoreModel.setScore({
            'playerName': player,
            'points': 1,
          });

          return;
        } 
        else {
          var noughtDifference = _.difference( value, _this.getNoughtPositions() );
          _this.isNoughtWin = _.isEmpty(noughtDifference);

          if( _this.isNoughtWin ) {
            $result.find('.type').text(result);
            $result.find('.name').text( noughtPlayerName );
            player = noughtPlayerName;
            isGameEnded = true;

            _this.scoreModel.setScore({
              'playerName': player,
              'points': 1
            });

            return;
          }
          else if( _this.isGameOver() ) {
            _this.isDraw = true;
            result = 'Game is drawn !';
            $result.find('.type').text(result);
            isGameEnded = true;
            return;
          }

        }
      });

      if(isGameEnded) {
        this.gameResult = result;
        this.winner = player;
        this.showMessage();
        this.scoreModel.saveItem();
      }

    },

    // Find who is Next Player and update in the Interface to player to aware of it.
    setNextPlayer: function () {
      this.currentPlayer = (this.currentPlayer == 1) ? 2 : 1;
      this.currentPlayerClass = 'player' + this.currentPlayer;
      this.cellClassList = 'column selected ' + this.currentPlayerClass;

      var playerIndex = this.currentPlayer - 1,
          nameAttribute = this.playerAttribute[playerIndex],
          iconClass = this.playerClass[playerIndex],
          nextPlayerName = this.model.get(nameAttribute);

      this.$('div.status span.name').text(nextPlayerName);
      this.$('div.status span.player').removeClass().addClass(iconClass);
    },

    // Trigger on every click of Cell. 
    tick: function (e) {
      var $cell = $(e.target),
          $label = $cell.parent();
  
      if( !$label.hasClass('selected') ) {
        $label.removeClass().addClass(this.cellClassList);
        $cell.addClass(this.currentPlayerClass).removeClass('empty');
        this.setNextPlayer();
      }

      if( this.canCheckForResult() ) {
        this.iterateCombinations();
      }
    },

    // Setting Initial Game Notes for Players to understand.
    setGameDetails: function () {
      var crossPlayerName = this.model.get('crossPlayerName');

      this.$('div.cross span.name').text(crossPlayerName);
      this.$('div.nought span.name').text(this.model.get('noughtPlayerName'));
      this.$('div.status span.name').text(crossPlayerName);
    },

    // Trigger on Render View.
    render: function () {
      this.$el.html(gameTpl);
      this.setGameDetails();
    }

  });

});