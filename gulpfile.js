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
        .pipe(dest("dist/css"))  /*что с ним сделать - destнуть в указанную папку*/
        .pipe(browserSync.stream()) /*что с ним сделать - перезапустить браузер*/
}
exports.styles = styles;  /*завершение, чтоб заработало*/


function html() {
    return src("#src/*.html")
        .pipe(dest("dist"))
        .pipe(browserSync.stream()) 
}
exports.html = html;


// Определяем логику работы Browsersync
function browsersync() {
    browserSync.init({ // Инициализация Browsersync
        server: { baseDir: "dist/" }, // Указываем папку сервера
        notify: false, // Отключаем уведомления
        online: true // Режим работы: true или false
    })
}
// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;


function watcher() {
    watch(["#src/**/*.scss"], styles); /*следи за фаилами по этому пути, при из изменении запускай styles*/
    watch(["#src/*.html"], html).on('change', browserSync.reload);
    //watch(["#src/js/script.js"], scripts);
}
exports.watcher = watcher;

// Copy

function copy() {
    src([
        "#src/img/**/*.{png,jpg,svg}",
        "#src/fonts/*.{woff2,woff}",
        "#src/*.ico",
        "#src/img/**/*.svg"
    ], {
        base: "#src"
    })
        .pipe(dest("dist"))
}

exports.copy = copy;




exports.default = parallel(html, copy, styles, watcher, browsersync);