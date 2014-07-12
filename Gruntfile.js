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
				node: true,
				globals: {
					define: true,
					require: true,
					integrity_common: true,
					integrity_md5: true,
					integrity_crc32: true,
					Promise: true,
					SparkMD5: true,
					crypto: true
				}
			},
			src: ['lib/*.js', 'integrity.js']
		},
		concat: {
			build: {
				options: {
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.author %> */'
				},
				src: ['lib/common.js', 'lib/crc32.js', 'integrity.js'],
				dest: 'dist/integrity.js'
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
					'dist/integrity.min.js': ['dist/integrity.js']
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
