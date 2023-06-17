module.exports = function(grunt){

    grunt.initConfig({
        copy: {
          main: {
            files: [
              // flattens results to a single level
              {
                expand: true, 
                flatten: true, 
                src: ['bower_components/jquery/dist/*'], 
                dest: '../../htdocs/js/jquery/', 
                filter: 'isFile'
              },
            ],
          },
        },
        concat: {
          options: {
            separator: '\n',
            sourceMap: true,
          },
          css: {
            src: ['../css/**/*.css'],
            dest: 'dist/style.css',
          },
          js: {
            src: ['../js/**/*.js'],
            dest: 'dist/app.js',
          },
          scss: {
            src: ['../scss/**/*.scss'],
            dest: 'dist/style.scss',
          }
        },
        cssmin: {
          options: {
            mergeIntoShorthands: false,
            roundingPrecision: -1
          },
          target: {
            files: {
              '../../htdocs/css/style.min.css': [ 'dist/style.css']
            }
          }
        },
        sass: {                              // Task
          dist: {                            // Target
            options: {                       // Target options
              style: 'expanded'
            },
            files: {                         // Dictionary of files
              'main.css': 'main.scss',       // 'destination': 'source'
              'widgets.css': 'widgets.scss'
            }
          }
        },
        uglify: {
          minify: {
            options: {
              sourceMap: true,
            },
            files: {
              '../../htdocs/js/app.min.js': ['dist/app.js']
            }
          }
        },
        obfuscator: {
          options: {
              banner: '// obfuscated with grunt-contrib-obfuscator.\n',
              debugProtection: true,
              debugProtectionInterval: true,
              domainLock: ['grunt.local']
          },
          task1: {
              files: {
                  '../../htdocs/js/app.obfus.js': ['dist/app.js']
              }
          }
        },
        watch: {
            css: {
              files: ['../css/**/*.css'],
              tasks: ['concat:css'],
              options: {
                spawn: false,
              },
            },
            js: {
              files: ['../js/**/*.js'],
              tasks: ['concat:js'],
              options: {
                spawn: false,
              },
            },
          },
      });

      grunt.loadNpmTasks('grunt-contrib-concat');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-cssmin');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-contrib-obfuscator');
      grunt.loadNpmTasks('grunt-contrib-sass');

      grunt.registerTask('default',['helloworld','copy','concat','cssmin','uglify','obfuscator','watch']);
      grunt.registerTask('css',['concat:css','cssmin']);
      grunt.registerTask('js',['concat:js','uglify','obfuscator'])
    
    grunt.registerTask("helloworld",function(){
        console.log("I am grunt running...");
    })
}