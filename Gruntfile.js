module.exports = function(grunt) {
	// Project configuration
	//wrapper method
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: ['*.js'],
				dest: 'bin/<%= pkg.name %>.min.js'
			}
		}
	});

	// add task plugin
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// add task list
	grunt.registerTask('default',['uglify']);
};