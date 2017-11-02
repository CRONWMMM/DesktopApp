var gulp = require("gulp");
var $ = require("gulp-load-plugins");
var open = require("open");

var app = {
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

