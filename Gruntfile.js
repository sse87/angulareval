module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    jshint: {
      build: {
        src: 'js/src/*.js'
      },
    },

    concat: {
      foo: {
        src: ['js/src/main.js', 'js/src/*.js'],
        dest: 'build/<%= pkg.name %>.js'
      }
 
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
        src: '<%= concat.foo.dest %>',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    
    watch: {
      scripts: {
        files: ['js/src/*.js'],
        tasks: ['jshint', 'concat', 'uglify']
      }
    }
    
  });
 
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
  // Default task(s).
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};