const {src, dest, watch, series} = require('gulp');
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass');
const autoprefixer =  require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const  minify  =  require ('gulp-minify' );
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng-compress');

// Static server
function bs() {
  serveSass()
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  watch("./*.html").on('change', browserSync.reload);
  watch("./sass/**/*.sass", serveSass);
  watch("./sass/**/*.scss", serveSass);
  watch("./js/*.js").on('change', browserSync.reload);
};

function serveSass() {
  return src("./sass/**/*.sass", "./sass/**/*.scss")
      .pipe(sass())
      .pipe(autoprefixer({
        cascade:  false
      }))
      .pipe(dest("./css"))
      .pipe(browserSync.stream());
};

function buildCSS(dont) {
  src('css/**/**.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest('dist/css/'));
  dont();
};

function buildJS(dont) {
  src(['js/**.js', 'js/**.min.js'])
    .pipe(minify({
      ext:{
        min:'.js'
      }
    }))
    .pipe(dest('dist/js/')); 
  dont();
};

function htmlMin(dont) {
  src('**html')
    .pipe(htmlmin({ collapseWhitespace:  true  }))
    .pipe(dest('dist/'))
  dont();
};

function php(dont) {
  src('**.php')
    .pipe(dest('dist/'));
  src('phpmailer/**/**')
    .pipe(dest('dist/phpmailer'))
  dont();
};

function fonts(dont) {
  src('fonts/**/**')
    .pipe(dest('dist/fonts'))
  dont();
};

function imageMin(done){
  src('img/**/**')
    .pipe(dest('dist/img/'))
  src('img/**/*.svg')
    .pipe(dest('dist/img/'))
  done();
};

exports.serve = bs;
exports.build = series(buildCSS, buildJS, htmlMin, php, fonts, imageMin);