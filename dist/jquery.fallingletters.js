/*! Falling Letters - v0.1.0 - 2014-08-22
* https://github.com/waynegraham/fallingletters
* Copyright (c) 2014 Wayne Graham; Licensed MIT */
(function($) {

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
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.fallingletters.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].fallingletters = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));