'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var src = {css: 'css/sass/main.scss', js: 'js/**/*.js'};
var destBase = '../';
var dest = {css: destBase + 'css', js: destBase + 'js'};

gulp.task('css', function () {
    return gulp.src(src.css)
            .pipe(sass())
            .pipe(concat('main.min.css'))
            .pipe(autoprefix())
            .pipe(cssnano())
            .pipe(gulp.dest(dest.css));
});

gulp.task('js', function () {
    return gulp.src(src.js)
            .pipe(concat('main.min.js'))
            //.pipe(uglify())
            .pipe(gulp.dest(dest.js));
});

gulp.task('watch', ['css', 'js'], function () {
    gulp.watch('css/sass/**/*.scss', ['css']);
    gulp.watch(src.js, ['js']);
});

gulp.task('default', ['watch']);
