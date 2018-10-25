/*global module:false*/
module.exports = function (grunt) {
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
            arLang: {
                src: [],
                options: {
                    require: ['./src/lang/ar:./lang/ar']
                },
                dest: 'dist/lang/ar.js'
            },
            azLang: {
                src: [],
                options: {
                    require: ['./src/lang/az:./lang/az']
                },
                dest: 'dist/lang/az.js'
            },
            beLang: {
                src: [],
                options: {
                    require: ['./src/lang/be:./lang/be']
                },
                dest: 'dist/lang/be.js'
            },
            bgLang: {
                src: [],
                options: {
                    require: ['./src/lang/bg:./lang/bg']
                },
                dest: 'dist/lang/bg.js'
            },
            bsLang: {
                src: [],
                options: {
                    require: ['./src/lang/bs:./lang/bs']
                },
                dest: 'dist/lang/bs.js'
            },
            caLang: {
                src: [],
                options: {
                    require: ['./src/lang/ca:./lang/ca']
                },
                dest: 'dist/lang/ca.js'
            },
            csLang: {
                src: [],
                options: {
                    require: ['./src/lang/cs:./lang/cs']
                },
                dest: 'dist/lang/cs.js'
            },
            cyLang: {
                src: [],
                options: {
                    require: ['./src/lang/cy:./lang/cy']
                },
                dest: 'dist/lang/cy.js'
            },
            daLang: {
                src: [],
                options: {
                    require: ['./src/lang/da:./lang/da']
                },
                dest: 'dist/lang/da.js'
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
            enLang: {
                src: [],
                options: {
                    require: ['./src/lang/en:./lang/en']
                },
                dest: 'dist/lang/en.js'
            },
            esLang: {
                src: [],
                options: {
                    require: ['./src/lang/es:./lang/es']
                },
                dest: 'dist/lang/es.js'
            },
            etLang: {
                src: [],
                options: {
                    require: ['./src/lang/et:./lang/et']
                },
                dest: 'dist/lang/et.js'
            },
            euLang: {
                src: [],
                options: {
                    require: ['./src/lang/eu:./lang/eu']
                },
                dest: 'dist/lang/eu.js'
            },
            faLang: {
                src: [],
                options: {
                    require: ['./src/lang/fa:./lang/fa']
                },
                dest: 'dist/lang/fa.js'
            },
            fiLang: {
                src: [],
                options: {
                    require: ['./src/lang/fi:./lang/fi']
                },
                dest: 'dist/lang/fi.js'
            },
            frLang: {
                src: [],
                options: {
                    require: ['./src/lang/fr:./lang/fr']
                },
                dest: 'dist/lang/fr.js'
            },
            hrLang: {
                src: [],
                options: {
                    require: ['./src/lang/hr:./lang/hr']
                },
                dest: 'dist/lang/hr.js'
            },
            huLang: {
                src: [],
                options: {
                    require: ['./src/lang/hu:./lang/hu']
                },
                dest: 'dist/lang/hu.js'
            },
            idLang: {
                src: [],
                options: {
                    require: ['./src/lang/id:./lang/id']
                },
                dest: 'dist/lang/id.js'
            },
            itLang: {
                src: [],
                options: {
                    require: ['./src/lang/it:./lang/it']
                },
                dest: 'dist/lang/it.js'
            },
            jaLang: {
                src: [],
                options: {
                    require: ['./src/lang/ja:./lang/ja']
                },
                dest: 'dist/lang/ja.js'
            },
            kaLang: {
                src: [],
                options: {
                    require: ['./src/lang/ka:./lang/ka']
                },
                dest: 'dist/lang/ka.js'
            },
            koLang: {
                src: [],
                options: {
                    require: ['./src/lang/ko:./lang/ko']
                },
                dest: 'dist/lang/ko.js'
            },
            ltLang: {
                src: [],
                options: {
                    require: ['./src/lang/lt:./lang/lt']
                },
                dest: 'dist/lang/lt.js'
            },
            lvLang: {
                src: [],
                options: {
                    require: ['./src/lang/lv:./lang/lv']
                },
                dest: 'dist/lang/lv.js'
            },
            mkLang: {
                src: [],
                options: {
                    require: ['./src/lang/mk:./lang/mk']
                },
                dest: 'dist/lang/mk.js'
            },
            mnLang: {
                src: [],
                options: {
                    require: ['./src/lang/mn:./lang/mn']
                },
                dest: 'dist/lang/mn.js'
            },
            msLang: {
                src: [],
                options: {
                    require: ['./src/lang/ms:./lang/ms']
                },
                dest: 'dist/lang/ms.js'
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
            plLang: {
                src: [],
                options: {
                    require: ['./src/lang/pl:./lang/pl']
                },
                dest: 'dist/lang/pl.js'
            },
            ptLang: {
                src: [],
                options: {
                    require: ['./src/lang/pt:./lang/pt']
                },
                dest: 'dist/lang/pt.js'
            },
            ptBRLang: {
                src: [],
                options: {
                    require: ['./src/lang/pt_BR:./lang/pt_BR']
                },
                dest: 'dist/lang/pt_BR.js'
            },
            roLang: {
                src: [],
                options: {
                    require: ['./src/lang/ro:./lang/ro']
                },
                dest: 'dist/lang/ro.js'
            },
            ruLang: {
                src: [],
                options: {
                    require: ['./src/lang/ru:./lang/ru']
                },
                dest: 'dist/lang/ru.js'
            },
            slLang: {
                src: [],
                options: {
                    require: ['./src/lang/sl:./lang/sl']
                },
                dest: 'dist/lang/sl.js'
            },
            sqLang: {
                src: [],
                options: {
                    require: ['./src/lang/sq:./lang/sq']
                },
                dest: 'dist/lang/sq.js'
            },
            srLang: {
                src: [],
                options: {
                    require: ['./src/lang/sr:./lang/sr']
                },
                dest: 'dist/lang/sr.js'
            },
            svLang: {
                src: [],
                options: {
                    require: ['./src/lang/sv:./lang/sv']
                },
                dest: 'dist/lang/sv.js'
            },
            trLang: {
                src: [],
                options: {
                    require: ['./src/lang/tr:./lang/tr']
                },
                dest: 'dist/lang/tr.js'
            },
            uaLang: {
                src: [],
                options: {
                    require: ['./src/lang/ua:./lang/ua']
                },
                dest: 'dist/lang/ua.js'
            },
            ukLang: {
                src: [],
                options: {
                    require: ['./src/lang/uk:./lang/uk']
                },
                dest: 'dist/lang/uk.js'
            },
            viLang: {
                src: [],
                options: {
                    require: ['./src/lang/vi:./lang/vi']
                },
                dest: 'dist/lang/vi.js'
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
