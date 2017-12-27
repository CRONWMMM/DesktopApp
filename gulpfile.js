const gulp = require('gulp');
// const $ = require('gulp-load-plugins')();
const rename = require('gulp-rename');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const base64 = require('gulp-base64');


const config = {
	libPath: '',				// 依赖
	srcPath: 'src/',			// 源码
	devPath: 'build/',			// 生产
	prdPath: 'dist/'			// 发布
};


gulp.task('js', () => {
	return gulp.src(config.srcPath + 'js/**/*.js')
				.pipe(uglify())
				.pipe(rev())
				.pipe(gulp.dest(config.devPath + 'js'))
				.pipe(gulp.dest(config.prdPath + 'js'))
				.pipe(rev.manifest())
				.pipe(gulp.dest('rev/js'));
});

gulp.task('sass', ['js'], () => {

	return gulp.src(config.srcPath + 'sass/**/*.scss')
				.pipe(sass().on('error', sass.logError))
				.pipe(rev())
				.pipe(gulp.dest(config.devPath + 'css'))
				.pipe(cssmin())
				.pipe(gulp.dest(config.prdPath + 'css'))
				.pipe(rev.manifest())
				.pipe(gulp.dest('rev/css'));

});

gulp.task('html', ['js', 'sass'], () => {

	return gulp.src(['rev/**/*.json', config.srcPath + 'views/**/*.html'])
				.pipe(revCollector())
				.pipe(gulp.dest(config.devPath + 'views'))
				.pipe(gulp.dest(config.prdPath + 'views'))
})

gulp.task('build', ['js', 'sass', 'html'], () => {});
