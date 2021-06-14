const { src, dest, watch, parallel, series } = require("gulp"); /*я сборщик*/
const scss = require("gulp-sass");                      /*Sass plugin for Gulp.*/
const autoprefixer = require("gulp-autoprefixer");      /*догадайся с трёх раз*/
const browserSync = require("browser-sync").create();
const del = require('del');
const pug = require('gulp-pug');

function scss2css() {
    return src("#src/style.scss") /* найти путь к файлу с которым нужно работать */
        .pipe(scss()) /*что с ним сделать - чз gulp-sass преврати scss в css*/
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 10 version"],
            grid: true
        }))
        .pipe(dest("#src/"))  /*что с ним сделать - destнуть в эту папку*/
        
}
exports.scss2css = scss2css;  /*завершение, чтоб заработало*/


// Определяем логику работы Browsersync
function browsersync() {
    browserSync.init({ // Инициализация Browsersync
        server: { baseDir: "#src" }, // Указываем папку сервера
        notify: false, // Отключаем уведомления
        online: true // Режим работы: true или false
    })
}
// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;


function watcher() {
    watch(["#src/*.scss"], scss2css); /*следи за фаилами по этому пути, при из изменении запускай scss2css*/
    watch(["#src/*.pug"]).on('change', browserSync.reload);
}
exports.watcher = watcher;


function clean() {
    return del([
        "#src/style.css", /* gulp clean удалит этот фаил*/
        "#src/*.html"
    ]);
};
exports.clean = clean;


function pugToHtml() {
    return src('#src/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(dest('#src'));
}
exports.pugToHtml = pugToHtml; /*gulp pugToHtml*/


exports.default = series(clean, parallel( pugToHtml, scss2css, watcher, browsersync)); /*команда gulp */