# Falling Letters at 60 FPS

For a long time the Scholars' Lab had a digital sign that showed
scholars entering the lab space what was going on that week. One of the
features of that sign was the falling letters that Bethany had created
in Macromedia Flash (yes, it was that long ago). If you've had to deal
with Flash before on long-running tasks, you've inevitably discovered
that Flash doesn't always behave nicely, even when it's doing something
as "simple" as rotating a set of letters.

This had bothered me on a few fronts. First, there was the occasional
physical annoyance of noticing the sign was frozen and having to restart
the browser (which was in another room). Second, this couldn't run on
mobile devises. Ok, so for the sign, that's not that big of a deal
(unless we replaced the screen, computer, and Extron setup with a wifi
enabled tablet device), but Bethany also had it running on her site.
And, if you looked at it on a mobile device, it broke the flow of the
site.

## Requirements

One of the great things about being a developer is that when you find
somethign that annoys you, you can do something else :) In my case, what
I wanted to do for this is re-implement the falling letters Flash in
JavaScript to leverage modern browsers' ability to tap in to the
[GPU](https://en.wikipedia.org/wiki/Graphics_processing_unit) to make
the animations performant (not gittery) on just about every platform. I
also wanted to use fonts from Google Fonts and allow users to "easily"
use any of these they'd like. I also want this to be somewhat simple to
integrate into sites, so it needs to have minimal requirements to
include. In fact, I'd love it to look something like this:

```html

<div id="letters"></div>

<script>
$('#letters').fallingletters();
</script>
```

I also want to make this play nicely with package managers for front-end
development [(bower](http://bower.io/)).

## Setup

### Bower

Back in the day, we had to manage JavaScript dependencies by hand. Ok,
so when I was starting to do this work, we wrote wonky DHTML and crossed
our fingers. Today there are far saner methods of automating
dependencies for any front-end JavaScript project you're working on.
Bower helps project documentation by stating explicitly what your
particular interface depends on (and where to get it from), as well as
automating the installation and updating of those dependencies. The
first thing to do in a project like this (other than run `git init`) is
to write a `bower.json` file that holds the definitions. The following
assumes you have [`bower` installed](http://bower.io/#install-bower).

```shell
$ mkdir -p ~/projects/fallingletters
$ cd ~/projects/fallingletters
$ git init
$ bower init
```

Here you're asked a series of questions about the package you're wanting
to build. Fill out the questions with the following:

```shell
[?] name: fallingletters
[?] version: (0.0.0)
[?] description: Falling letters effect
[?] main file:
[?] what types of modules does this package expose? amd
[?] keywords: text, jquery, falling
[?] authors: Your Name <email@address>
[?] license: MIT
[?] homepage: http://your.homepage.org
[?] set currently installed components as dependencies? n
[?] add commonly ignored files to ignore list? y
[?] would you like to mark this package as private which prevents it from being accidentally published to the registry? n
[?] Looks good? y
```

This will write a `bower.json` file that will look something like this:

```json
{
  "name": "fallingletters",
  "version": "0.0.0",
  "authors": [
    "Wayne Graham <wayne.graham@virginia.edu>"
  ],
  "description": "Falling letters effect",
  "moduleType": [
    "amd"
  ],
  "keywords": [
    "text",
    "jquery",
    "falling"
  ],
  "license": "MIT",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ]
}
```

The big thing in this file which may not be immediately obvious may be
the `moduleType` setting for AMD. That's beyond the scope of this piece,
but I encourage you to read ["Why
AMD?"](http://requirejs.org/docs/whyamd.html) in the
[Require.js](http://requirejs.org/) documentation.

For the time being, we'll add a single dependency. If you've not worked
with JSON before, it can be a bit of a pain. The thing I always forget
is that all strings need to be double-quoted strings ("foo"), and not
single-quoted strings ('foo'). Plus, getting the symbols correct (is it
a `{` or a `[`) can be challenging. To help, you can have `bower` write
these lines for you.

```console
$ bower install jquery --save
```

If you open your `bower.json` file again, you'll see that it added a
section for `dependencies`:

```json
  "dependencies": {
    "jquery": "~2.1.1"
  }
```

It should also add a new directory to your project named
`bower_components`. If you run `git status` on the project, you'll see
that `git` doesn't know about these files, but all we want to add is the
`bower.json` file, and ignore anything in the `bower_components`. Add
`node_modules` to the `.gitignore` file and `git add bower.json` and
commit it.

```shell
$ echo "bower_components" >> .gitignore
$ git add .gitignore bower.json
$ git commit -am "Add bower dependencies"
```

### Grunt
Developers really like to separate concerns for working on projects. The
`bower` utility's only job is to resolve dependencies for your project
and download them to a convenient location. But we'll need to do more
with this code, like take any libraries we need and concatenate them in
to a single file, minify them, and even run tests on them. This is where
tools like [Grunt](http://gruntjs.com/) and [Gulp](http://gulpjs.com/)
come in. These tools provide a framework to automate tasks for
JavaScript/web projects to tell your system how to accomplish these
things. Gulp has come a long way since it first came out, but Grunt, by
virtue of being out first has a far larger number of plugins to automate
tasks, so I'm using that here.

We need two things for Grunt to work, a `package.json` file to define to
`npm` which files to grab out of the repository, and a `Gruntfile.js`
file to define the tasks. (And please don't get me started on the
proliferation of the files with the word 'file' in them in modern
projects). Grunt uses the `npm` manager for node.js (which provides
backend JavaScript dependency resolution; different from frontend
dependencies that are taken care through `bower`).

Assuming you have [`node`](http://nodejs.org/) and
[`grunt`](http://gruntjs.com/getting-started#installing-the-cli)
installed, we can use the following template for the `package.json` ((or
use [project
scaffolding](http://gruntjs.com/project-scaffolding)).

```json
{
  "name": "fallingletters",
  "version": "0.1.0-ignored",
  "devDependencies": {
    "grunt": "~0.4.5",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-contrib-uglify": "~0.5.0",
    "grunt-contrib-concat": "~0.3.0"

  }
}
```

I want to install these dependencies, then add a few others:


```shell
$ npm install
$ npm install grunt-bower-concat grunt-bower-task grunt-preen grunt-contrib-watch grunt-contrib-clean --save-dev
```

This will update your `package.json` file to something that looks like
this:

```json
{
  "name": "fallingletters",
  "version": "0.1.0",
  "engines": {
    "node": ">= 0.10.0"
  },
  "devDependencies": {
    "grunt": "^0.4.5",
    "grunt-bower-concat": "^0.3.0",
    "grunt-bower-task": "^0.4.0",
    "grunt-contrib-clean": "^0.6.0",
    "grunt-contrib-concat": "~0.3.0",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-contrib-uglify": "~0.5.0",
    "grunt-contrib-watch": "^0.6.1",
    "grunt-preen": "^1.0.0"
  }
}
```

Now with the dependencies resolved, you'll notice a new directory
`node_modules` in your project. Add this to the `.gitignore` file, add
the `package.json` file, and then commit them.

```shell
$ echo "node_modules" >> .gitignore
$ git add package.json
$ git commit -am "Add Grunt dependencies"
```

Now for the `Gruntfile.js` file. I find this to be one of the ugliest
parts of this process as it's essentially a JavaScript file with many
nested JSON nodes for each task. And, in a hand-wavy fashion, paste the
following in to your `Gruntfile.js`.


```javascript
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    bower: {
      install: {
        options: {
          targetDir: './bower_components',
          layout: 'byType',
          install: true,
          verbose: false,
          cleanTargetDir: false,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    },
    bower_concat: {
      all: {
        dest: 'build/_bower.js',
        exclude: [
            'jquery',
            'modernizr'
        ],
        dependencies: {
          //'underscore': 'jquery'
        },
        bowerOptions: {
          relative: false
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-preen');

  // Default task.
  grunt.registerTask('default', ['jshint', 'preen', 'concat', 'uglify']);

};

```

To get this to work, we need to add a file (`lib/fallingletters.js`) and
add a section to the `bower.json` file.

```shell
$ mkdir -p lib
$ touch lib/fallingletters.js
```

Now in `bower.json` add this section before the last `}`:

```json
"preen": {
  "jquery": ["dist/*.js"]
}
```

### That's a lot of code...

Ok, fair point. This is mostly the setup for automating the tasks. We
now have defined tasks for concatenating files, installing bower
components, concatenating bower components, "uglifying" the code base
(minimizing the JavaScript), providing feedback on coding standards
(jshint), preening unneeded files, and running all of this whenever a
file is updated. To get a list of all the tasks you can run
individually, run the `grunt --help` command.

```shell
...
Available tasks
         clean  Clean files and folders. *
        concat  Concatenate files. *
        uglify  Minify files with UglifyJS. *
         qunit  Run QUnit unit tests in a headless PhantomJS instance. *
        jshint  Validate files with JSHint. *
         watch  Run predefined tasks whenever watched files change.
       default  Alias for "jshint", "qunit", "clean", "concat", "uglify" tasks.
...
```

