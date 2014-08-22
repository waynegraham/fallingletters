/*
 * fallingletters
 * https://github.com/waynegraham/fallingletters
 *
 * Copyright (c) 2014 Wayne Graham
 * Licensed under the MIT license.
 */

(function($) {

  "use strict";

  // Collection method.
  $.fn.fallingletters = function() {
    return this.each(function(i) {

      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.fallingletters = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.fallingletters.options, options);
    return options;
  };

  // Static method default options.
  $.fallingletters.options = {
    fonts: "'Kite One::latin', 'Londrina+Solid', 'Lily+Script+One'",
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  };

  // Custom selector.
  $.expr[':'].fallingletters = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
