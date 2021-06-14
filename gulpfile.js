const { src, dest, watch, parallel, series } = require("gulp"); /*я сборщик*/
const scss = require("gulp-sass");                      /*Sass plugin for Gulp.*/
const autoprefixer = require("gulp-autoprefixer");      /*догадайся с трёх раз*/
const browserSync = require("browser-sync").create();   


function styles() {
    return src("#src/style.scss") /* найти путь к файлу с которым нужно работать */
        .pipe(scss()) /*что с ним сделать - чз gulp-sass преврати scss в css*/
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 10 version"],
            grid: true
        }))
        .pipe(dest("#src/"))  /*что с ним сделать - destнуть в эту папку*/
        .pipe(browserSync.stream()) /*что с ним сделать - перезапустить браузер*/
}
exports.styles = styles;  /*завершение, чтоб заработало*/


// Определяем логику работы Browsersync
function browsersync() {
    browserSync.init({ // Инициализация Browsersync
        server: { baseDir: "#src/" }, // Указываем папку сервера
        notify: false, // Отключаем уведомления
        online: true // Режим работы: true или false
    })
}
// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;


function watcher() {
    watch(["#src/*.scss"], styles); /*следи за фаилами по этому пути, при из изменении запускай styles*/
    watch(["#src/*.html"]).on('change', browserSync.reload);
}
exports.watcher = watcher;


const del = require('del');

function clean() {
  return del([
    "#src/style.css" /* gulp clean удалит этот фаил*/
  ]);
};
exports.clean = clean;   

exports.default = series(clean, parallel(styles, watcher, browsersync)); /*команда gulp */