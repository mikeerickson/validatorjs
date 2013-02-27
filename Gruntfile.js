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
    concat: {
      dist: {
        src: [
          '<banner:meta.banner>',
          '<file_strip_banner:src/validator.js>'
        ],
        dest: 'dist/<%= pkg.buildname %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.buildname %>.min.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      all: [
        'Gruntfile.js',
        '<%= meta.src %>',
        '<%= meta.specs %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    uglify: {}
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('default', 'jshint concat min');
  grunt.registerTask('travis', 'jshint');

};
