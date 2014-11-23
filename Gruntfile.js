var fs = require('fs');

/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  var filename = 'validator';
  var language = 'en';

  if (grunt.option('lang') !== undefined && grunt.option('lang') !== 'en') {
    var langFileExists = fs.existsSync('src/lang/' + grunt.option('lang') + '.js');

    if (!langFileExists) {
      throw new Error('Language file src/lang/' + grunt.option('lang') + '.js does not exist.');
    }

    language = grunt.option('lang');
    filename = 'validator-' + language;
  }

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      src   : 'src/*.js',
      specs : 'spec/*.js'
    },
    concat: {
      options: {
        separator: "\n\n",
        stripBanners: true,
        banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.homepage %> - " +
          "<%= grunt.template.today('yyyy-mm-dd') %> */\n(function() {\n\n",
        footer: "\n\n})();"
      },
      dist: {
        src: [
          'src/lang/' + language + '.js',
          'src/shims.js',
          'src/extend.js',
          'src/utils.js',
          'src/validatorerrors.js',
          'src/validator.js',
          'src/environment.js'
        ],
        dest: 'dist/' + filename + '.js',
      }
    },
    jshint: {
      all: [
        '<%= meta.src %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.homepage %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      my_target: (function() {
        var key = 'dist/' + filename + '.min.js';
        var files = {};
        files[key] = ['dist/' + filename + '.js'];

        return {
          files: files
        };
      }())
    },
    watch: {
      files: ['src/**/*.js'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};
