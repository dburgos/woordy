(function(){
  'use strict';
    angular
      .module('woordyApp')
      .factory('core.words', function() {
        return {
          random: function(min, max) {
            return Math.floor(Math.random() * max) + min;
          },
          mangle: function(word) {
            if(word && word.length > 0) {
              var mangled = "";
              var originalLength = word.length;
              // For each char
              for(var i=0; i<originalLength; i++) {
                // Get a random char
                var random = this.random(0, word.length);
                // Save it
                mangled += word.charAt(random);
                // Remove it from the original word
                word = word.slice(0, random) + word.slice(random+1);
              }
              return mangled;
            }
            return word;
          },
          isPlayed: function(playedList, word) {
            var isPlayed = false;
            var hasPlayed = playedList.length > 0;
            if(hasPlayed) {
              var length = playedList.length;
              for(var i=0; !isPlayed && i<length; i++) {
                isPlayed = playedList[i].label == word;
              }
            }
            return isPlayed;
          },
          pickOne: function(wordList, playedList) {
            var selected = null;
            if(wordList.length === playedList.length) {
              // If already played all the words,
              // just pick a random one
              var random = this.random(0,wordList.length);
              selected = wordList[random];
            } else {
              while(! selected) {
                var random = this.random(0,wordList.length);
                selected = wordList[random].label;
                if(this.isPlayed(playedList, selected)) {
                  selected = null;
                }
              }
            }
            return selected;
          }
        }
    });
})();