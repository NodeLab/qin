var gulp = require('gulp');
var gm = require('gulp-gm');
var xls2json = require('gulp-xls2json');

gulp.task('hello', function(){
	console.log('Hello World')
})

gulp.task('resize',function() {
	gulp.src("case/sushi/1406-1/images/grid/*.jpg"
		)
		.pipe(gm(function (gmfile) {
			return gmfile.resize(148,148,"!").setFormat('jpg');
		}))
		.pipe(gulp.dest('case/sushi/1406-1/images/grid/'))
	return	
})

gulp.task('logo',function(){
	gulp.src("/Users/elr-mbp/Desktop/grid/*.{jpg,jpeg,JPG,png}")
		.pipe(gm(function(gmfile){
			return gmfile.resize(180,180,"!").setFormat('jpg');
		}))
		.pipe(gulp.dest('/Users/elr-mbp/Desktop/grid-p/'))
	return 
})

gulp.task('parse_xls',function(){
	gulp.src('/Users/elr-mbp/Desktop/test.xls')
		.pipe(xls2json())
		.pipe(gulp.dest('/Users/elr-mbp/Desktop/temp/'));
})