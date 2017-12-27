const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const open = require("open");

const app = {
	libsPath   : "libs/",		// 依赖库
	staticPath : "static/",		// 源代码
	devPath    : "build/",		// 生产环境
	prdPath    : "dist/"		// 发布环境
};


// 构建依赖库
gulp.task("lib",function(){
	gulp.src(app.libsPath + "**/*")
		.pipe(gulp.dest(app.devPath + "libs"))
		.pipe(gulp.dest(app.prdPath + "libs"));
});

// 构建html
gulp.task("html",function(){
	gulp.src(app.staticPath + "**/*.html")
		.pipe(gulp.dest(app.devPath))
		.pipe(gulp.dest(app.prdPath));
});

// 构建scss文件
gulp.task("scss",function(){
	gulp.src(app.staticPath + "sass/main.scss")
		.pipe($.sass())
		.pipe(gulp.dest(app.devPath + "css"))
		.pipe($.cssmin())
		.pipe(gulp.dest(app.prdPath + "css"));
});















