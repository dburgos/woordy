(function(){
  'use strict';

  angular
    .module('woordyApp')
    .controller('gameCtrl', ['$scope', '$interval','API', gameCtrl]);

  function gameCtrl($scope, $interval, API) {
    'use strict';
    /* jshint validthis: true */
    var vm = this;
    vm.status = 'new';
    vm.word = '';
    vm.wordList = [];
    vm.playedList = [];
    vm.timer = null;
    vm.timeLeft = 0;

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

    var newGame = function() {
      vm.playedList = [];
      vm.timeLeft = CONFIG.timeout;
      vm.word = _selectWord();
      vm.word = _mangle(vm.word);
      vm.timer = $interval(function() {
        gameLoop();
      }, 1000);
    };

    var gameLoop = function() {
      vm.timeLeft -= 1;

      if(vm.timeLeft <= 0) {
        gameOver();
      }
    };

    var _selectWord = function() {
      var selected = null;
      if(vm.wordList.length === vm.playedList.length) {
        // If already played all the words,
        // just pick a random one
        var random = _random(0,vm.wordList.length);
        selected = vm.wordList[random];
      } else {
        while(! selected) {
          var random = _random(0,vm.wordList.length);
          selected = vm.wordList[random].label;
          if(_isPlayedWord(selected)) {
            selected = null;
          }
        }
      }
      return selected;
    };

    var _isPlayedWord = function(word) {
      var isPlayed = false;
      var hasPlayed = vm.playedList.length > 0;
      if(hasPlayed) {
        var length = vm.wordList.length;
        for(var i=0; !isPlayed && i<length; i++) {
          if(vm.playedList.length < i) {
            isPlayed = vm.playedList[i].label == word;
          }
        }
      }
      return isPlayed;
    };

    var _mangle = function(word) {
      if(word && word.length > 0) {
        var mangled = "";
        // For each char
        for(var i=0; i<word.length; i++) {
          // Get a random char
          var random = _random(0, word.length);
          // Save it
          mangled += word.charAt(random);
          // Remove it from the original word
          word = word.slice(0, random) + word.slice(random);
        }
        return mangled;
      }
      return word;
    };

    var _random = function(min, max) {
      return Math.floor(Math.random() * max) + min;
    };
  }
})();