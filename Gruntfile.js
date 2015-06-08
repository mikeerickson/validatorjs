/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  var filename = 'validator';

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
          'src/messages.js',
          'src/validatorerrors.js',
          'src/validator.js',
          'src/rules.js',
          'src/lang/en.js',
          'src/environment.js'
        ],
        dest: 'dist/validator.js',
        nonull: true
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
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.homepage %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        src: 'dist/validator.js',
        dest: 'dist/validator.min.js'
      }
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
  grunt.registerTask('test', ['concat']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};
