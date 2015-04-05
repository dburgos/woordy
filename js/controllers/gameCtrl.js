(function(){
  'use strict';

  angular
    .module('woordyApp')
    .controller('gameCtrl', ['$scope', gameCtrl]);

  function gameCtrl($scope) {
    'use strict';
    /* jshint validthis: true */
		var vm = this;
		vm.status = "new";
  }


})();