var letters = (function() {
  "use strict";

  var flakes = {
    init: function() {
      flakes.callFontFlakes();
    },
    callFontFlakes: function() {
      window.setInterval(function() {
        flakes.fontFlake();
      }, 300);
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
      var color = '#'+Math.floor(Math.random()*16777215).toString(16);
      var randomEntry = flakes.randomLetter();
      var randomLeft = Math.ceil(Math.random() * stageWidth);
      var preRandomFontSize = Math.ceil(Math.random() * 100);
      var randomFontSize = preRandomFontSize + 10;
      var flakeName = 'flake-' + randomEntry;
      //var grayScale = Math.ceil(Math.random() * 256);
      //var hue = 'rgb(' + grayScale + ',' + grayScale + ',' + grayScale + ')';

      var font = flakes.randomFont();

      //console.log('width', stageWidth);
      //console.log('height', stageHeight);
      //console.log('left', randomLeft);

      //console.log('color', flakes.randomColor('000'));
      // animation
      $('<div />', {
        text: randomEntry,
        id: flakeName,
      }).appendTo('body').addClass('fontFlake').css('font-family', font).css('left', randomLeft).css('font-size', randomFontSize).css('color', color).animate({
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
