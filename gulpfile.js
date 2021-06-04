const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default; /*минифицирует js*/
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const del = require("del");


function styles() {
    return src("#src/sass/style.scss") /* найти путь к файлу с которым нужно работать */
        .pipe(scss({ outputStyle: "compressed" })) /*что с ним сделать - чз gulp-sass преврати scss в css и сожми*/
        .pipe(concat("style.min.css"))  /*что с ним сделать - concatнуь чз gulp-concat (переименовать, объеденить css, в js тож умеет*/
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 10 version"],
            grid: true
        }))
        .pipe(dest("dist/css"))  /*что с ним сделать - destнуть в указанную папку*/
        .pipe(browserSync.stream()) /*что с ним сделать - перезапустить браузер*/
}


function watcher() {
    watch(["#src/sass/**/*.scss"], styles); /*следи за фаилами по этому пути, при из изменении запускай styles*/
    watch(["#src/*.html"]).on('change', browserSync.reload);
    watch(["#src/js/script.js"], scripts);
}



function browsersync() {
    browserSync.init({
        server: {
            //baseDir: "#src/"  /*обновление браузера*/
            baseDir: "dist/"
        }
    });
}

function scripts() {
    return src([
        "node_modules/jquery/dist/jquery.js",
        "#src/js/script.js"
    ])
        .pipe(concat("script.min.js"))
        .pipe(uglify())
        .pipe(dest("dist/js"))
        .pipe(browserSync.stream())
}

function build() {
    return src([
        "#src/fonts/**.*",
        "#src/**.html",
        "#src/img/**/*",
        "#src/public/**.*",
        "#src/*.ico"
    ], { base: "#src" })
        .pipe(dest("dist/"))
}

function imgmin() {
    return src("#src/img/**/*")
        .pipe(imagemin(
            [
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 75, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [
                        { removeViewBox: true },
                        { cleanupIDs: false }
                    ]
                })
            ]
        ))
        .pipe(dest("dist/img"))
}



function deldist() {
    return del("dist") 
}


exports.styles = styles;  /*завершение, чтоб заработало*/
exports.watcher = watcher;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.imgmin = imgmin;
exports.deldist = deldist;

exports.build = series (deldist, imgmin, build);
exports.default = parallel(scripts, browsersync, watcher);
