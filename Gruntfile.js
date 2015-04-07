"use strict";

module.exports = function ( grunt ) {

    // Project configuration.
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),

        csslint: {
            strict: {
                options: {
                    csslintrc: '.csslintrc',
                    import: 2,
                    formatters: ['compact']
                },
                src: [
                    'css/**/*.css'
                ]
            }
        },

        connect: {
            mock: {
                options: {
                    base: '.',
                    open: true,
                    keepalive: true,
                    hostname: '*'
                }
            }
        },

        clean: {
            options: {
                force: true
            },
            styles: {
                src: [
                    'dist/css/style.css',
                    'dist/css/style.css.map'
                ]
            }
        },

        sass: {
            expanded: {
                options: {
                    style: 'expanded',
                    lineNumbers: true
                },
                files: {
                    'dist/css/style.css': 'css/style.scss'
                }
            },
            compressed: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/css/style.css': 'css/style.scss'
                }
            }
        },

        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            sass: {
                files: ['css/**/*.scss'],
                tasks: ['sass:expanded']
            }
        }

    });

    grunt.loadNpmTasks( 'grunt-contrib-csslint' );
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default
    grunt.registerTask( 'default', [
        'dev'
    ] );

    // Code quality
    grunt.registerTask( 'test', [
        'clean',
        'sass:expanded',
        'csslint'
    ] );        

    // Dev
    grunt.registerTask( 'dev', [
        'clean',
        'test',
        'watch'
    ] );

    // connect
    grunt.registerTask( 'start', [
        'connect'
    ] );

};
