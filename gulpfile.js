var gulp = require('gulp');
var gm = require('gulp-gm');

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
	gulp.src("/Users/elr-mbp/Desktop/北京-天天中奖餐饮/*/logo.{jpg,jpeg,JPG}")
		.pipe(gm(function(gmfile){
			return gmfile.resize(180,180,"!").setFormat('jpg');
		}))
		.pipe(gulp.dest('/Users/elr-mbp/Desktop/temp/'))
	return 
})
