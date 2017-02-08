module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            my_target: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets/javascript',
                        src: [
                            '*.js', '!*.min.js'
                        ],
                        dest: 'assets/javascript',
						ext: '.min.js'
                    }
                ]
            }
        },
        cssmin: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: 'assets/css',
                        src: [
                            '*.css', '!*.min.css'
                        ],
                        dest: 'assets/css',
                        ext: '.min.css'
                    }
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin']);

};
