// Generated on 2013-04-02 using generator-webapp 0.1.5
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json' ),
        yeoman: yeomanConfig,
        watch: {
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['js']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass', 'modernizr']
            },
            templates: {
                files: ['<%= yeoman.app %>/templates/{,*/}*.hbs'],
                tasks: ['newer:assemble:pages']
            },
            layouts: {
                files: ['<%= yeoman.app %>/templates/layouts/{,*/}*.hbs'],
                tasks: ['assemble']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/templates/{,*/}*.hbs',
                    '{.tmp,<%= yeoman.app %>}/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,webp}'
                ],
            }
        },
        //Add the modernizr task with the following configuration
        modernizr: {
            // [REQUIRED] Path to the build you're using for development.
            devFile: '<%= yeoman.app %>/bower_components/modernizr/modernizr.js',

            // [REQUIRED] Path to save out the built file.
            outputFile: '<%= yeoman.app %>/bower_components/modernizr/modernizr.min.js',

            files: [
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '.tmp/styles/{,*/}*.css',
                '!<%= yeoman.app %>/scripts/vendor/*'
            ],
            uglify: true
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                'tasks/{,*/}*.js',
                'test/spec/{,*/}*.js'
            ]
        },
        jsvalidate: {
            files: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                'tasks/{,*/}*.js',
                'test/spec/{,*/}*.js',
                '<%= yeoman.dist %>/scripts/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.options.hostname %>:<%= connect.options.port %>/index.html']
                }
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.app %>/styles/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: 'app/bower_components',
                relativeAssets: true,
                require: [
                    'breakpoint',
                    'sass-getunicode'
                ]
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        assemble: {
            options: {
                flatten: true,
                layout: 'default.hbs',
                layoutdir: 'app/templates/layouts',
                partials: ['app/templates/partials/*.hbs'],
                helpers: 'app/templates/helpers/*.js',
                pkg: '<%= pkg %>',
                data: 'app/data/*.json',
                menu: 'app/data/menu.json'
            },
            pages: {
                files: {
                    'app/': [
                        'app/templates/pages/*.hbs'
                    ]
                }
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>'
            },
            html: '<%= yeoman.app %>/index.html'
        },
        usemin: {
            options: {
                dirs: ['<%= yeoman.dist %>']
            },
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            // This task is pre-configured if you do not wish to use Usemin
            // blocks for your CSS. By default, the Usemin block from your
            // `index.html` will take care of minification, e.g.
            //
            //     <!-- build:css({.tmp,app}) styles/main.css -->
            // dist: {
            //     files: {
            //         '<%= yeoman.dist %>/styles/site.min.css': [
            //             '.tmp/styles/{,*/}*.css',
            //             '<%= yeoman.app %>/styles/{,*/}*.css'
            //         ]
            //     }
            // }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        bumpup: {
            files: ['package.json', 'component.json']
        },
        concurrent: {
            server: [
                'compass',
                'copy:styles',
                'js'
            ],
            test: [
                'copy:styles',
                'js'
            ],
            dist: [
                'js',
                'compass:dist',
                'copy:styles',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        }
    });

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('assemble');

    grunt.registerTask('js', [
        'newer:jsvalidate',
        'newer:jshint',
        'modernizr'
    ]);

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'newer:assemble:pages',
            'concurrent:server',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'newer:assemble:pages',
        'modernizr',
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'usemin'
    ]);

    grunt.registerTask('lint', [
        'newer:jshint',
        'newer:jsvalidate'
    ]);

    grunt.registerTask('travis', [
        'lint',
        'test'
    ]);

    grunt.registerTask('commit', [
        'travis'
    ]);

    grunt.registerTask('default', [
        'lint',
        'test',
        'build'
    ]);

    grunt.registerTask('assembler', [
        'newer:assemble:pages'
    ]);
};
