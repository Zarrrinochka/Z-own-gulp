"use strict" /*по умолчанию изменения ECMAScript 5 не применяются, нужно явно их активировать с помощью директивы: "use strict".*/

var gulp = require("gulp"),
    pug = require("gulp-pug"),
    scss = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create(),
    autoprefixer = require("gulp-autoprefixer");


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

gulp.task("watch", function () {
    gulp.watch("src/pug/pages/**/*.pug", gulp.series("pug")),
    gulp.watch("src/static/sass/**/*.scss", gulp.series("styles"))
}
)

gulp.task("serve", function () {
    browserSync.init({ // Инициализация Browsersync
        server: { baseDir: "./build" }, // Указываем папку сервера
    })
    browserSync.watch("build", browserSync.reload);
});

gulp.task("default", gulp.series(
    gulp.parallel("pug", "styles"), gulp.parallel("watch", "serve")
));