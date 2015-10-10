# Falling Letters
jQuery plugin for adding falling letters effect.

## Getting Started
Download the [production version][min] or the [development version][max].

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/fallingletters.min.js"></script>
<script>
$(document).ready(function(){
  $('letters').fallingletters();
)}:
</script>
```

## Documentation
### Installation
You can call the fallingletters effect with an id `letters` with a single line of JavaScript.

```javascript
$('#letters').fallingletters(options);
```

### Options

Name    | type   | default                                                 | description
------- | ------ | ------------------------------------------------------- | --------------------------------------------------------------------------
fonts   | string | 'Kite+One::latin', "Londrina+Solid",  "Lily+Script+One" | List of fonts (from Google Fonts directory) to use for the falling letters
letters | string | ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz    | Characters to use for falling letters

## Examples
## Release History
_(Nothing yet)_

[min]: https://raw.github.com/waynegraham/fallingletters/master/dist/fallingletters.min.js
[max]: https://raw.github.com/waynegraham/fallingletters/master/dist/fallingletters.js
