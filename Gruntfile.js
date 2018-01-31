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
      uaLang: {
        src: [],
	options: {
         require: ['./src/lang/ua:./lang/ua']
	},
	dest: 'dist/lang/ua.js'
      },
      ruLang: {
        src: [],
        options: {
          require: ['./src/lang/ru:./lang/ru']
        },
        dest: 'dist/lang/ru.js'
      },
      deLang: {
        src: [],
        options: {
          require: ['./src/lang/de:./lang/de']
        },
        dest: 'dist/lang/de.js'
      },
      elLang: {
        src: [],
        options: {
          require: ['./src/lang/el:./lang/el']
        },
        dest: 'dist/lang/el.js'
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
      faLang: {
        src: [],
        options: {
          require: ['./src/lang/fa:./lang/fa']
        },
        dest: 'dist/lang/fa.js'
      },
      viLang: {
        src: [],
        options: {
          require: ['./src/lang/vi:./lang/vi']
        },
        dest: 'dist/lang/vi.js'
      },
      ptLang: {
        src: [],
        options: {
          require: ['./src/lang/pt:./lang/pt']
        },
        dest: 'dist/lang/pt.js'
      },
      jaLang: {
        src: [],
        options: {
          require: ['./src/lang/ja:./lang/ja']
        },
        dest: 'dist/lang/ja.js'
      },
      trLang: {
        src: [],
        options: {
          require: ['./src/lang/tr:./lang/tr']
        },
        dest: 'dist/lang/tr.js'
      },
      zhLang: {
        src: [],
        options: {
          require: ['./src/lang/zh:./lang/zh']
        },
        dest: 'dist/lang/zh.js'
      },
      zhTWLang: {
        src: [],
        options: {
          require: ['./src/lang/zh_TW:./lang/zh_TW']
        },
        dest: 'dist/lang/zh_TW.js'
      },
      nbNOLang: {
          src: [],
          options: {
              require: ['./src/lang/nb_NO:./lang/nb_NO']
          },
          dest: 'dist/lang/nb_NO.js'
      },
      nlLang: {
        src: [],
        options: {
          require: ['./src/lang/nl:./lang/nl']
        },
        dest: 'dist/lang/nl.js'
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
