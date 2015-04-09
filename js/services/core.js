(function(){
  'use strict';
    angular
      .module('woordyApp')
      .factory('core', ['core.words',function(coreWords) {
        return {
          getScore: function(originalWord, deletes, deleteScore) {
            var length  = originalWord.length;
            var score   = Math.floor(Math.pow(1.95,length/3));
            var penalty = deletes * -1;
            score += penalty;
            if(score < 0) {
              score = 0;
            }
            return score;
          },
          words: coreWords
        }
    }]);
})();