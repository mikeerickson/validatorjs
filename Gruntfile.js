/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  require('jit-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: 'src/*.js',
      options: {
        jshintrc: '.jshintrc'
      }
    },
    browserify: {
      ruLang: {
        src: [],
        options: {
          require: ['./src/lang/ru:./lang/ru']
        },
        dest: 'dist/lang/ru.js'
      },
      esLang: {
        src: [],
        options: {
          require: ['./src/lang/es:./lang/es']
        },
        dest: 'dist/lang/es.js'
      },
      frLang: {
        src: [],
        options: {
          require: ['./src/lang/fr:./lang/fr']
        },
        dest: 'dist/lang/fr.js'
      },
      itLang: {
        src: [],
        options: {
          require: ['./src/lang/it:./lang/it']
        },
        dest: 'dist/lang/it.js'
      },
      plLang: {
        src: [],
        options: {
          require: ['./src/lang/pl:./lang/pl']
        },
        dest: 'dist/lang/pl.js'
      },
      jaLang: {
        src: [],
        options: {
          require: ['./src/lang/ja:./lang/ja']
        },
        dest: 'dist/lang/ja.js'
      },
      dist: {
        files: {
          'dist/validator.js': 'src/validator.js'
        },
        options: {
          banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.homepage %> - " +
          "<%= grunt.template.today('yyyy-mm-dd') %> */",
          browserifyOptions: {
            standalone: 'Validator'
          }
        }
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

  // Default task.
  grunt.registerTask('build', ['browserify']);
  grunt.registerTask('dist', ['jshint', 'build', 'uglify']);
  grunt.registerTask('default', ['dist']);

};
