"use strict" /*по умолчанию изменения ECMAScript 5 не применяются, нужно явно их активировать с помощью директивы: "use strict".*/

var gulp = require("gulp"),
    pug = require("gulp-pug"),
    scss = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create(),
    autoprefixer = require("gulp-autoprefixer"),
    del = require("del");

gulp.task("pug", function () {
    return gulp.src("src/pug/pages/*.pug")
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest("build"))
});

gulp.task("styles", function () {
    return gulp.src("src/static/sass/style.scss")
        .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 10 version"],
            grid: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("build"))
});


gulp.task("copyimg", function () {
    return gulp.src("src/static/img/*.{png,jpg,svg,ico}")
    .pipe(gulp.dest("build/img"))
});

gulp.task("copyfont", function () {
    return gulp.src("src/static/fonts/*.{woff,woff2}")
    .pipe(gulp.dest("build/fonts"))
});

gulp.task("copyjs", function () {
    return gulp.src("src/static/js/*.js")
    .pipe(gulp.dest("build/js"))
});


gulp.task("del", function () {
    return del(["./build/"])
});

gulp.task("watch", function () {
    gulp.watch("src/pug/pages/**/*.pug", gulp.series("pug")),
    gulp.watch("src/static/sass/**/*.scss", gulp.series("styles"))
});

gulp.task("serve", function () {
    browserSync.init({ // Инициализация Browsersync
        server: { baseDir: "./build" }, // Указываем папку сервера
    })
    browserSync.watch("build", browserSync.reload);
});

gulp.task("default", gulp.series( "del", "copyimg", "copyfont", "copyjs", gulp.parallel("pug", "styles"), gulp.parallel("watch", "serve")
));