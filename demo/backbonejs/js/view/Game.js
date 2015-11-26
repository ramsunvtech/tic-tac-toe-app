define([
  'view/shared/Base',
  'model/Score',
  'model/Game',
  'text!templates/game.html'
], function (BaseView, ScoreModel, GameModel, gameTpl) {

  return BaseView.extend({

    el: $('main'),

    scoreModel: new ScoreModel(),

    model: new GameModel(),

    events: {
      'click .cell.empty': 'tick',
      'click #back': 'goBack'
    },

    crossPlayerId: 'player1',
    noughtPlayerId: 'player2',
    currentPlayer: 1,
    currentPlayerClass: '',
    cellClassList: '',
    playerClass: ['player cross-player', 'player nought-player'],
    playerAttribute: ['crossPlayerName', 'noughtPlayerName'],

    // Game Result
    isCrossWin: false,
    isNoughtWin: false,
    isDraw: false,
    
    // Messages
    gameResult: '',
    winner: '',

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

    goBack: function () {
      window.location = 'index.html';
    },

    getPlayerDetails: function () {
      var gamePlayers = JSON.parse( localStorage.getItem('GamePlayer') || '{}' );

      return {
        "crossPlayerName": gamePlayers.crossPlayerName || '',
        "noughtPlayerName": gamePlayers.noughtPlayerName || '',
      };
    },

    setPlayerDetails: function () {
      this.model.set( this.getPlayerDetails() );
    },

    initialize: function () {
      $('header, summary').html('');

      this.currentPlayerClass = this.crossPlayerId;
      this.cellClassList = 'column selected ' + this.crossPlayerId;
      this.setPlayerDetails();
    },

    canCheckForResult: function () {
      return (this.$('input.cell:checked').length > 4);
    },

    getPositions: function (playerCellClass) {
      var positions = $('input.cell:checked.' + playerCellClass).map(function () {
        return parseInt(this.value);
      }).get();
      return positions;
    },

    getCrossPositions: function () {
      return this.getPositions(this.crossPlayerId);
    },

    getNoughtPositions: function () {
      return this.getPositions(this.noughtPlayerId);
    },

    isGameOver: function () {
      return (this.$('input.cell:checked').length == 9);
    },

    showResult: function () {
      var message = (this.winner) ? 'Congratultion ' + this.winner + '! \n You Won' 
          : this.gameResult + this.winner;
      alert(message);

      this.goBack();
    },

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
        this.showResult();
        this.scoreModel.saveItem();
      }

    },

    getResult: function () {
      return {
        "crossPlayerName": "",
        "noughtPlayerName": "",
        "won": "",
        "result": ""
      }
    },

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

    setGameDetails: function () {
      var crossPlayerName = this.model.get('crossPlayerName');

      this.$('div.cross span.name').text(crossPlayerName);
      this.$('div.nought span.name').text(this.model.get('noughtPlayerName'));
      this.$('div.status span.name').text(crossPlayerName);
    },

    render: function () {
      this.$el.html(gameTpl);
      this.setGameDetails();
    }

  });

});