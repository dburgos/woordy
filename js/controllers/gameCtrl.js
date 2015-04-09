(function(){
  'use strict';

  angular
    .module('woordyApp')
    .controller('gameCtrl', ['$scope','$interval','API','core', gameCtrl]);

  function gameCtrl($scope, $interval, API, core) {
    'use strict';
    /* jshint validthis: true */
    var vm = this;
    vm.status = 'new';
    vm.input = '';
    vm.word = '';
    vm.playerName = '';
    vm.originalWord = '';
    vm.wordList = [];
    vm.playedList = [];
    vm.timer = null;
    vm.timeLeft = 0;
    vm.deletes = 0;
    vm.score = 0;

    API.Words.getAll().success(function(data) {
      if(data && data.results && data.results.length > 0) {
        vm.wordList = data.results;
      };
    });

    $scope.$watch(function () {
      return vm.status;
    }, function (current, original) {
      if(current === 'play') {
        newGame();
      }
    });

    $scope.$watch(function () {
      return vm.input;
    }, function (current, original) {
      checkInput(current, original);
    });

    var newGame = function() {
      vm.playedList = [];
      vm.score = 0;
      vm.deletes = 0;
      vm.timeLeft = CONFIG.timeout;
      vm.originalWord = core.selectWord(vm.wordList, vm.playedList);
      vm.word = core.mangle(vm.originalWord);
      vm.timer = $interval(function() {
        gameLoop();
      }, 1000);
    };

    var gameLoop = function() {
      vm.timeLeft -= 1;

      if(vm.timeLeft <= 0) {
        _gameOver();
      }
    };

    var checkInput = function(now, before) {
      if(now && before) {
        var isRemoving = now.length < before.length;
        if(isRemoving) {
          vm.deletes++;
        }

        if(now == vm.originalWord) {
          _guessSuccess();
        }
      }
    };

    var _gameOver = function() {
      // Stop and remove the timer
      $interval.cancel(vm.timer);
      vm.timer = null;
      vm.status = 'gameover';
      // Save score
      var data = {
        player: vm.playerName,
        score: vm.score
      };
      API.Scores.create(data);
    };

    var _guessSuccess = function() {
      // Calculate score
      var score = core.getScore(vm.originalWord, vm.deletes, -1);
      // Add
      vm.score += score;
      // Next word
      vm.originalWord = core.selectWord(vm.wordList, vm.playedList);
      vm.word = core.mangle(vm.originalWord);
      // Clean
      vm.input = '';
    };
  }
})();