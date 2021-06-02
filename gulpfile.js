const { src, dest, watch, parallel } = require("gulp");
const scss = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;



function browsersync() {
    browserSync.init({
        server: {
            baseDir: "#src/"
        }
    });
}

function scripts() {
    return src([
        //"node_modules/jquerry/dist/jquerry.js",
        "#src/js/script.js",
    ])
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(dest("#src/js"))
    .pipe(browserSync.stream())
}

function styles() {
    return src("#src/sass/style.scss")
        .pipe(scss({ outputStyle: "compressed" }))
        .pipe(concat("style.min.css"))
        .pipe(dest("#src/css"))
        .pipe(browserSync.stream())
}

function watcher() {
    watch(["#src/sass/**/*.scss"], styles);
    watch(["#src/js/script.js", "!#src/js/script.min.js"], scripts);
    watch(["#src/*.html"]).on('change', browserSync.reload);
}

function build() {
    return src([
        "#src/css/style.min.css",
        "#src/fonts/**.*",
        "#src/**.html",
        "#src/img/**/*",
        //"#src/js/script.min.js",
        "#src/public/**.*",
        "#src/*.ico"
    ], {base: "#src"})
    .pipe(dest("dist"))

}

exports.styles = styles;
exports.watcher = watcher;
exports.browsersync = browsersync;
exports.build = build;
exports.scripts = scripts;

exports.default = parallel(scripts, browsersync, watcher);
