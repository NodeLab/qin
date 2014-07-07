var gulp = require('gulp');
var gm = require('gulp-gm');
var cwd = process.cwd();
var xls2json = require('gulp-xls2json');
var config = require('./utils/getConfig')
var src , width , height

//parse the config 
(function(config){
	var temp = config.resize.path.trim()
	src =  temp.slice(-1) == '/' ? temp.slice(0,-1) : temp
	width = config.resize.width
	height = config.resize.height
})(config)	

gulp.task('hello', function(data){
	console.log('Hello World')
})

gulp.task('resize',function() {
	gulp.src(src+"*.jpg"
		)
		.pipe(gm(function (gmfile) {
			return gmfile.resize(width,height,"!").setFormat('jpg');
		}))
		.pipe(gulp.dest(src))
	return	
})

gulp.task('logo',function(){
	gulp.src("/Users/elr-mbp/Downloads/银塘火锅图片/*.{jpg,jpeg,JPG,png}")
		.pipe(gm(function(gmfile){
			return gmfile.resize(440,272,"!").setFormat('jpg');
		}))
		.pipe(gulp.dest('/Users/elr-mbp/Downloads/银塘火锅图片/dest'))
	return 
})

gulp.task('parse_xls',function(){
	gulp.src('/Users/elr-mbp/Desktop/test.xls')
		.pipe(xls2json())
		.pipe(gulp.dest('/Users/elr-mbp/Desktop/temp/'));
})

exports = gulp

//gulp.start("hello")
