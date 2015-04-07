(function(){
  'use strict';

  angular
    .module('woordyApp')
    .controller('gameCtrl', ['$scope', 'API', gameCtrl]);

  function gameCtrl($scope, API) {
    'use strict';
    /* jshint validthis: true */
    var vm = this;
    vm.status = "new";

    API.Words.getAll().success(function(data) {
      vm.wordList = [];
      if(data && data.results && data.results.length > 0) {
        vm.wordList = data.results;
      };
    });
  }
})();