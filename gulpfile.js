const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');


function browsersync() {
  browserSync.init({
    server: { baseDir: 'app/' },
    notify: false,
  })
};

function scripts() {
  return src('app/js/main.js')
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js/'))
  .pipe(browserSync.stream())
};

function styles() {
  return src('app/sass/style.sass')
  .pipe(sass())
  .pipe(concat('main.min.css'))
  .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
  .pipe(cleanCSS(( { level: { 1: {specialComments: 0} }/*, format: 'beautify' красивый вид css*/ } )))
  .pipe(dest('app/css/'))
  .pipe(browserSync.stream())
};

function images() {
  return src('app/images/src/**/*')
  .pipe(newer('app/images/dest/'))
  .pipe(imagemin())
  .pipe(dest('app/images/dest/'))
};

// удаляет все файлы в image
function cleanimg() {
  return del('app/images/dest/**/*', {force: true})
};

function cleandist() {
  return del('dist/**/*', {force: true})
};

function buildCopy() {
  return src([
    'app/css/**/*',
    'app/js/**/*',
    'app/images/dest/**/*',
    'app/**/*.html',
    'app/fonts/**/*'
  ], { base: 'app' })
  .pipe(dest('dist'));
}

function startwatch() {
  watch('app/sass/**/*', styles);
  watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
  watch('app/**/*.html').on('change', browserSync.reload);
  watch('app/images/src/**/*', images);
};

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.build = series(cleandist, styles, scripts, images, buildCopy);

exports.default = parallel(styles, scripts, browsersync, startwatch);