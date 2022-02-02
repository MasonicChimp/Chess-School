const { src, dest, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const webp = require('gulp-webp');

const paths = {
  sass: './src/sass/**/*.scss',
  sassDest: './dist/css',
  js: './src/js/**/*.js',
  jsDest: './dist/js',
  img: './src/img/*',
  imgDest: './dist/img',
  dist: './dist',
};

function cssSass(done) {
  src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(dest(paths.sassDest));
  done();
}

function js(done) {
  src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(dest(paths.jsDest));
  done();
}

function imgConverter(done) {
  src(paths.img).pipe(webp()).pipe(dest(paths.imgDest));
  done();
}

function liveBrowser(done) {
  browserSync.init({ server: { baseDir: './' } });
  done();
}

function watchForChanges(done) {
  watch('*.html').on('change', browserSync.reload);
  watch(paths.img, imgConverter).on('change', browserSync.reload);
  watch([paths.sass, paths.js], parallel(cssSass, js)).on('change', browserSync.reload);
  done();
}

const mainFunctions = parallel(cssSass, js, imgConverter);
exports.default = series(mainFunctions, liveBrowser, watchForChanges);
