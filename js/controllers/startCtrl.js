(function(){
  'use strict';

  angular
    .module('woordyApp')
    .controller('startCtrl', ['$scope', startCtrl]);

  function startCtrl($scope) {
    'use strict';
    /* jshint validthis: true */
    var vm = this;

    $scope.play = function() {
      var playerName = $scope.$parent.game.playerName;
      // If the player name is valid, then play
      if(playerName && playerName.length > 3) {
        $scope.$parent.game.status = 'play';
      }
    }

  }
})();