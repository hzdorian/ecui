/*
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * author:  mycoin (mycoin@icloud.com)
 * date:    2013/12/14
 * resp:    https://github.com/mycoin/ecui/
 */
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt)

    // 初始化配置
    grunt.initConfig({
        concat: {
            options: {
                banner: '/*Copyright 2014 Baidu Inc. All rights reserved.*/',
            },
            js: {
                files: {
                    'dist/ecui.js': [
                        'src/ecui.js',
                        'src/adapter.js',
                        'src/core.js',
                        'src/control.js',
                        'src/input-control.js',
                        'src/button.js',
                        'src/scrollbar.js',
                        'src/panel.js',
                        'src/items.js',
                        'src/checkbox.js',
                        'src/radio.js',
                        'src/select.js',
                        'src/label.js',
                        'src/form.js',
                        'src/tree-view.js',
                        'src/month-view.js',
                        'src/table.js',
                        'src/popup-menu.js',
                        'src/locked-table.js',
                        'src/messagebox.js',
                    ],

                    'dist/ecui-ext.js': [
                        'src/ext/input.js',
                        'src/ext/pager.js',
                        'src/ext/calendar.js',
                        'src/ext/custom-checkboxs.js',
                        'src/ext/data-tree.js',
                        'src/ext/lite-table.js',
                        'src/ext/multi-select.js',
                        'src/ext/multi-calendar.js',
                        'src/ext/pop.js',
                        'src/ext/query-tab.js',
                        'src/ext/tip.js',
                    ],
                },
            },
            css: {
                files: {
                    'dist/ecui.css': [
                        'src/button.css',
                        'src/input.css',
                        'src/scrollbar.css',
                        'src/select.css',
                        'src/checkbox.css',
                        'src/radio.css',
                        'src/form.css',
                        'src/table.css',
                        'src/treeview.css',
                        'src/calendar.css',
                        'src/pop.css',
                        'src/messagebox.css',
                        'src/pager.css',
                        'src/query-tab.css',
                        'src/multi-select.css',
                        'src/area.css',
                        'src/data-tree.css',
                        'src/input-tree.css',
                        'src/tip.css',
                        'src/account-tree.css',
                        'src/idea-editor.css',
                        'src/custom.css',
                        'src/message-bar.css',
                        'src/suggest.css',
                    ],
                },
            },
        },
        uglify: {
            release: {
                files: {
                    'dist/ecui.min.js': ['dist/ecui.js'],
                    'dist/ecui-ext.min.js': ['dist/ecui-ext.js'],
                },
            },
        },

        // 复制二进制
        copy: {
            release: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['img/**'],
                        dest: 'dist/',
                    },
                ],
            },
        },

        php: {
            server: {
                options: {
                    port: 8080,
                    hostname: require('os').hostname(),
                    base: '.',
                    keepalive: true,
                    open: false,
                    bin: 'php',
                },
            },
        },

        watch: {
            options: {
                interval: 300,
                event: ['added', 'changed', 'deleted'],
                livereload: true,
                debounceDelay: 500,
            },

            live: {
                options: {
                    livereload: 8081,
                },

                files: ['dist/{,*/}*.js', 'dist/{,*/}*.css'],
            },
            css: {
                files: ['src/*.css'],
                tasks: ['concat:css'],
            },

            js: {
                files: ['src/*.js', 'src/ext/*.js'],
                tasks: ['concat:js'],
            },
        },
    })

    grunt.registerTask('default', function () {
        grunt.log.subhead('Please use one of the following commands:')
        grunt.log.writeln('')
        grunt.log.writeln('• grunt server  启动PHP服务器.')
        grunt.log.writeln('• grunt watch   监视源并自动编译.')
        grunt.log.writeln('• grunt build   基础编译.')

        grunt.log.writeln('\n\nsee all tasks `grunt --verbose`')
    })

    // 启动静态服务器
    grunt.registerTask('server', ['build', 'php', 'watch'])

    // 启动静态服务器
    grunt.registerTask('build', ['concat', 'uglify', 'copy'])
}
