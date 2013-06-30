var letters = (function() {
  "use strict";

  var flakes = {
    init: function() {
      flakes.callFontFlakes();
    },
    callFontFlakes: function() {
      window.setInterval(function() {
        flakes.fontFlake();
      }, 1000);
    },
    randomFont: function() {
      var randomElement = Math.floor(Math.random() * WebFontConfig.google.families.length);
      return flakes.cleanFont(WebFontConfig.google.families[randomElement]);
    },
    randomLetter: function() {
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      return possible.charAt(Math.floor(Math.random() * possible.length));
    },
    cleanFont: function(font) {
      return font.replace('+',' ');
    },
    fontFlake: function() {
      var stageWidth = $(window).width();
      var stageHeight = $(window).height();
      var randomEntry = flakes.randomLetter();
      var preRandomFontSize = Math.ceil(Math.random() * 40);
      var randomFontSize = preRandomFontSize + 10;
      var flakeName = 'flake-' + randomEntry;
      var grayScale = Math.ceil(Math.random() * 256);
      var hue = 'rgb(' + grayScale + ',' + grayScale + ',' + grayScale + ')';

      var font = flakes.randomFont();
    
      console.log(font);
      // animation
      $('<div />', {
        text: randomEntry,
        id: flakeName,
      }).appendTo('body').addClass('fontFlake').css('font-family', font).css('left', randomEntry).css('font-size', randomFontSize).css('color', hue).animate({
        "top": "+=" + stageHeight,
        opacity: 0
      }, 5000, function() {
        $('#'+flakeName).remove();
      });
    }
  };

  $(document).ready(function() {
    flakes.init();
  });

})();
