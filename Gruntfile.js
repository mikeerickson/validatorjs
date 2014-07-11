/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      src   : 'src/*.js',
      specs : 'spec/*.js'
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/validator.js'],
        dest: 'dist/validator.js',
      },
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
      my_target: {
        files: {
          'dist/validator.min.js': ['src/validator.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task.
  grunt.registerTask('default', ['jshint', 'uglify', 'concat']);
  grunt.registerTask('build', ['jshint', 'concat']);

};
