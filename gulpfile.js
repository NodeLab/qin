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
