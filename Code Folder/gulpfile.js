'use strict';

var gulp = require('gulp'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    minify = require('gulp-minify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect'),
    pngquant = require('imagemin-pngquant');

var source_paths = {
	index: './source/*.html',
	states: './source/states/*.html',
	partial: './source/partial/*.html',
	css: './source/css/*.css',
	js: './source/js/**/*.js',
	images: './source/images/*'
};
/**
 * Copia y minifica el index.html
 */
gulp.task('index', function () {
	return gulp.src(source_paths.index)
	    .pipe(minifyHtml({compatibility: 'ie8'}))
	    .pipe(gulp.dest('./dist'));
});
/**
 * Copia y minifica el html de states
 */
gulp.task('states', function () {
	return gulp.src(source_paths.states)
	    .pipe(minifyHtml({compatibility: 'ie8'}))
	    .pipe(gulp.dest('./dist/states'));
});
/**
 * Copia y minifica el html de partial
 */
gulp.task('partial', function () {
	return gulp.src(source_paths.partial)
	    .pipe(minifyHtml({compatibility: 'ie8'}))
	    .pipe(gulp.dest('./dist/partial'));
});
/**
 *Copia y minifica el css
 */
gulp.task('css', function () {
	return gulp.src(source_paths.css)
	    .pipe(minifyCss({compatibility: 'ie8'}))
	    .pipe(gulp.dest('./dist/css'));
});

/**
 * Copia, merge y minificación de los archivos js
 */
gulp.task('js', function () {
	return gulp.src(source_paths.js)
	    .pipe(concat('app.js'))
	    .pipe(minify())
	    .pipe(gulp.dest('./dist/js'))
});
/**
 * Copia las imagenes
 */
gulp.task('images', function () {
    return gulp.src(source_paths.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 8000,
        livereload: true
    });
});

gulp.task('watch', ['index', 'states', 'partial', 'css', 'js', 'images'], function () {
	gulp.watch(source_paths.index, ['index']);
	gulp.watch(source_paths.states, ['states']);
	gulp.watch(source_paths.partial, ['partial']);
	gulp.watch(source_paths.css, ['css']);
	gulp.watch(source_paths.js, ['js']);
	gulp.watch(source_paths.images, ['images']);
});

gulp.task('default', ['watch', 'connect']);