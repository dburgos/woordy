module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      js: {
        // the files to concatenate
        src: ["bower_components/angular/angular.min.js",
              "config.js",
              "js/woordyApp.js",
              "js/services/api.js",
              "js/services/core.js",
              "js/services/core.words.js",
              "js/controllers/gameCtrl.js",
              "js/controllers/startCtrl.js"],
        // the location of the resulting JS file
        dest: 'build/dist.js'
      },
      css: {
        // the files to concatenate
        src: ["bower_components/bootstrap/dist/css/bootstrap.min.css",
              "css/style.css"],
        // the location of the resulting css file
        dest: 'build/dist.css'
      }
    },

    uglify: {
      src: 'build/dist.js',
      dest: 'build/dist.min.js'
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'build',
          src: ['dist.css'],
          dest: 'build',
          ext: '.min.css'
        }]
      }
    },

    clean: {
      js: {
        src: ['build/dist.js']
      },
      css: {
        src: ['build/dist.css']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['concat','uglify','cssmin','clean']);
  grunt.registerTask('build-js', ['concat:js','uglify','clean:js']);
  grunt.registerTask('build-css', ['concat:css','cssmin','clean:css']);

};