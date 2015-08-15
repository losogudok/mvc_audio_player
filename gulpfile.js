var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('watch', function() {
	gulp.watch('./src/js/**/*.js', function() {
		browserify({debug: true})
			.transform(babelify.configure({
				blacklist: ['strict']
			}))
			.require("./src/js/app.js", {entry: true})
			.bundle()
			.on("error", function(err) {
				console.log("Error: " + err.message);
			})
			.pipe(fs.createWriteStream("./build/js/build.js"));
	});

	gulp.watch('./src/scss/**/*.scss', function() {
		gulp.src('./src/scss/main.scss')
			.pipe(sass({outputStyle: 'expanded'}))
			.pipe(autoprefixer({
				browsers: ['last 2 versions']
			}))
			.pipe(gulp.dest('build/css'));
	});

});
