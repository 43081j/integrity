module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				curly: true,
				forin: true,
				noarg: true,
				nonew: true,
				undef: true,
				strict: true,
				node: true
			},
			src: ['lib/*.js', 'fi.js']
		},
		concat: {
			build: {
				options: {
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.author %> */'
				},
				src: ['lib/common.js', 'lib/crc32.js', 'fi.js'],
				dest: 'dist/fi.js'
			}
		},
		uglify: {
			build: {
				options: {
					compress: true,
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.author %> */',
					mangle: true
				},
				files: {
					'dist/fi.min.js': ['dist/fi.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('build', ['concat:build', 'uglify:build']);
};