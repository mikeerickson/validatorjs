/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      src   : 'src/*.js',
      specs : 'spec/*.js',
      banner: '/*! <%= pkg.title || pkg.buildname %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    jshint: {
      all: [
        'Gruntfile.js',
        '<%= meta.src %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    uglify: {
      my_target: {
        files: {
          'dist/validator.min.js': ['src/validator.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  grunt.registerTask('default', ['jshint', 'uglify']);

};
