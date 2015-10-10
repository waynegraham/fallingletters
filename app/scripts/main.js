/* eslint-env jquery */
console.log('Made with love by http://github.com/waynegraham'); // eslint-disable-line no-console

// load fonts
var fontsReady = false;
var starting   = false;

var WebFontConfig = {
  google: {
    families: [
      "Kite+One::latin",
      "Londrina+Solid",
      "Lily+Script+One",
      "Fascinate+Inline",
      "Monsieur+La+Doulaise",
      "Life+Savers"
    ]
  },
  active: function() {
    console.log("All fonts are loaded...");
    fontsReady = true;
  }
};

(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();


// falling letters

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
    direction: function() {
      var directions = ['clockwise', 'counter']
      return directions[Math.floor(Math.random() * directions.length)];
    },
    randomInteger: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
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

      var animation_string = flakes.direction() + " " + flakes.randomInteger(1, 8) + "s infinite linear"

      var font = flakes.randomFont();
      var css_properties = {
        'font-family': font,
        'left': randomLeft,
        'font-size': randomFontSize,
        'color': color,
        'position': 'absolute',
        'top': '-100px',
        'z-index': '10',
        'display': 'block',
        '-webkit-animation': animation_string,
        '-moz-animation': animation_string,
        '-ms-animation': animation_string,
        'animation': animation_string
      };

      // animation
      $('<div />', {
        text: randomEntry,
        id: flakeName,
      }).appendTo('body').addClass('fontFlake').css(css_properties).animate({
        "top": "+=" + stageHeight,
        opacity: 0
      }, flakes.randomInteger(4000, 10000), function() {
        $('#'+flakeName).remove();
      });
    }
  };

  $(document).ready(function() {
    flakes.init();
  });

})();

$.keyframe.define(
  [
    {
      name: 'clockwise',
      from: { 'transform': 'rotate(0deg)' },
      to:   { 'transform': 'rotate(360deg)' },
    },
    {
      name: 'counter',
      from: { 'transform': 'rotate(360deg)' },
      to:   { 'transform': 'rotate(0deg)' }
    }
  ]
);
