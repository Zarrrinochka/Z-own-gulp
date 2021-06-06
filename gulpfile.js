const { src, dest, watch, parallel, series } = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const scss = require("gulp-sass");



function styles() {
    return src("#src/sass/style.scss") /* найти путь к файлу с которым нужно работать */
        .pipe(scss()) /*что с ним сделать - чз gulp-sass преврати scss в css*/
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 10 version"],
            grid: true
        }))
        .pipe(dest("#src/css"))  /*что с ним сделать - destнуть в указанную папку*/
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
    watch(["#src/sass/**/*.scss"], styles); /*следи за фаилами по этому пути, при из изменении запускай styles*/
    watch(["#src/*.html"]).on('change', browserSync.reload);
    //watch(["#src/js/script.js"], scripts);
}
exports.watcher = watcher;


exports.default = parallel(styles, watcher, browsersync);