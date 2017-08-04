'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat-util');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

const path = {
	src: {
		js: [
			'./src/**/*.js',
			'./src/*.js'
		],
		css: [
			'./res/*.css',
			'./res/**/*.css'
		],
		html: './res/index.html'
	},

	dest: {
		dir: './dist',
		js: {
			normal: 'index.js',
			min: 'index.min.js'
		},
		css: {
			normal: 'index.css',
			min: 'index.min.css'
		}
	}
};

gulp.task('buildJS', () => {
	return gulp.src(path.src.js)
		.pipe(sourcemaps.init())
			.pipe(concat(path.dest.js.normal))
			.pipe(concat.header('(function(win,doc,log,err) {'))
			.pipe(concat.footer('})(window,document,console.log,console.error);'))
			.pipe(gulp.dest(path.dest.dir))
			.pipe(uglify())
			.pipe(rename(path.dest.js.min))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(path.dest.dir));
});

gulp.task('buildCSS', () => {
	return gulp.src(path.src.css)
		.pipe(concat(path.dest.css.normal))
		.pipe(gulp.dest(path.dest.dir))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename(path.dest.css.min))
		.pipe(gulp.dest(path.dest.dir));
});

gulp.task('buildHTML', () => {
	return gulp.src(path.src.html)
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(path.dest.dir));
});

gulp.task('clean', () => {
	return del.sync(path.dest.dir);
});

gulp.task('watch', () => {
	gulp.watch(path.src.js, ['buildJS']);
	gulp.watch(path.src.css, ['buildCSS']);
	gulp.watch(path.src.html, ['buildHTML']);
});

gulp.task('build', ['clean', 'buildJS', 'buildCSS', 'buildHTML']);

gulp.task('dev', ['build'], () => {
	return gulp.src(path.dest.dir + '/' + path.dest.js.normal)
});

gulp.task('default', ['build']);