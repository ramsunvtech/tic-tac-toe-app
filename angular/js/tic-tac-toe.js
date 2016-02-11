var ticTacToeApp = angular.module('tic-tac-toe-app', []);

ticTacToeApp.controller('boardController', function ($scope) {

	var Game = {

		winningCombination: [],
		x: [],
		o: [],

		setDefaults: function () {
			$scope.boardSize = 3;
			$scope.gameStarted = false;
			$scope.score = [];
			$scope.nextPlayer = '';
			$scope.playerNames = {
				'x': 'Cross',
				'o': 'Nought'
			};
		},

		initialize: function () {
			this.setDefaults();
			this.setNextPlayer();
			$('main').css('width', (75 * $scope.boardSize) + 'px');
			$('label').removeClass('selected x o');
			this.x = this.o = [];
		},

		setNextPlayer: function () {
			$scope.nextPlayer = ($scope.nextPlayer == 'x') ? 'o' : 'x';
			$scope.nextPlayerName = $scope.playerNames[$scope.nextPlayer];
		},

		isEqual: function (input, combination) {
		  var flag = true,
		  	  n = $scope.boardSize;
		  for(var i = 0; i < n; i++) {
		    if(input.indexOf(combination[i]) == -1) {
		      flag = false;
		      break;
		    }
		  }
		  return flag;
		},

		getPlayersPoints: function () {
			var _this = this;

			this.x = [];
			this.o = [];

			$scope.score.filter(function (value, index) {
		      if(value == 'x') _this.x.push(index);
		      if(value == 'o') _this.o.push(index);
		    });

		},

		getWinningCombination: function () {
		    var n = $scope.boardSize,
		        horiz = 0,
		        h = 1,
		        vert = 0,
		        diag = 0,
		        d,
		        v = n,
		        winList = [];

		    for(var i = 1; i <= n; i++) {
		      var hCombination = [],
		          vCombination = [],
		          dCombination = [];

		      for (var j = 1; j <= n; j++) {
		        horiz += h;
		        hCombination.push(horiz);

		        vert = (j == 1) ? i : vert + n;
		        vCombination.push(vert);

		        if(i == 1) {
		          diag = (j == 1) ? i : diag + (n+i);
		          dCombination.push(diag);
		        }
		        else if(i == n) {
		          diag = (j == 1) ? i : diag + (n-1);
		          dCombination.push(diag);
		        }
		      }

		      winList.push(hCombination);
		      winList.push(vCombination);
		      if(dCombination.length > 0) winList.push(dCombination);
		    }

		    this.winningCombination = winList;
		},

		checkForWinner: function () {
			var winningCombination = this.winningCombination;
			for(var i in winningCombination) {

				if(this.isEqual(this.x, winningCombination[i])) {
					alert('Congratulation ' + $scope.playerNames.x + ' \n You Won !');
					this.initialize();
				}
				else if(this.isEqual(this.o, winningCombination[i])) {
					alert('Congratulation ' + $scope.playerNames.o + ' \n You Won !');
					this.initialize();
				}
			}

			if($('label:not(.selected)').length == 0) {
				alert('Match Drawn');
				this.initialize();
			}
		}
	};

	$scope.createList = function ( times ) {
    	return new Array(times);
	}

	$scope.tick = function (boxId) {
		var $box = $('#cell-' + boxId).parent();

		if(! $box.hasClass('selected') ) {
			$box.addClass( 'column selected ' + $scope.nextPlayer );
			$scope.score[boxId] = $scope.nextPlayer;
			Game.setNextPlayer();
			Game.getPlayersPoints();
			Game.getWinningCombination();
			Game.checkForWinner();
		}
		else {
			alert('Please choose some other box');
		}
	}

	$scope.setStatus = function (flag) {
		$scope.gameStarted = flag;
	}

	Game.initialize();
});