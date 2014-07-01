var gulp = require('gulp');
var gm = require('gulp-gm');
var xls2json = require('gulp-xls2json');
var config = require('./config')
var src , width , height

//parse the config 
(function(config){
	var temp = config.image.path.trim()
	src =  temp.slice(-1) == '/' ? temp.slice(0,-1) : temp
	width = config.image.width
	height = config.image.height
})(config)	

gulp.task('hello', function(data){
	console.log('Hello World')
	console.log(data())
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
	gulp.src("/Users/elr-mbp/Downloads/at/*.{jpg,jpeg,JPG,png}")
		.pipe(gm(function(gmfile){
			return gmfile.resize(207,128,"!").setFormat('jpg');
		}))
		.pipe(gulp.dest('/Users/elr-mbp/Downloads/at/'))
	return 
})

gulp.task('parse_xls',function(){
	gulp.src('/Users/elr-mbp/Desktop/test.xls')
		.pipe(xls2json())
		.pipe(gulp.dest('/Users/elr-mbp/Desktop/temp/'));
})

//gulp.start("resize")
