const {src, dest, task, watch, series} = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const sourcemaps = require("gulp-sourcemaps");
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const posthtml = require('gulp-posthtml');
const includehtml = require('posthtml-include');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const {optipng, jpegtran, svgo} = imagemin;
const svgstore = require('gulp-svgstore');
const webp = require('gulp-webp');
const plumber = require('gulp-plumber');
const sync = require('browser-sync').create();
const del = require('del');
const concat = require('gulp-concat');
const flatten = require('gulp-flatten');
const dirSep = require('path').sep;
const terser = require('gulp-terser');

const SOURCE = './source';
const BUILD = './build';
const SASS = SOURCE + '/sass';
const JS = SOURCE + '/js';
const BLOCKS = SASS + '/blocks';

const jsLibs = [
  SOURCE + '/libs/modernizr.js',
  SOURCE + '/libs/picturefill/src/picturefill.js'
];

const jsComponents = [
  JS + '/components/scroll.js',
  JS + '/components/work.js',
  JS + '/components/form.js',
];

const jsMain = [
  JS + '/main.js'
];

// HTML
task('html', function () {
  return src(SOURCE + '/*.html')
  .pipe(posthtml([
    includehtml({
      root: SOURCE
    })
  ]))
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true
  }))
  .pipe(dest(BUILD));
});

// SASS в CSS
task('css', function () {
  return src(SASS + '/main.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(csso())
  .pipe(rename({
    basename: 'style',
    suffix: '.min'
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(dest(BUILD + '/css'))
  .pipe(sync.stream());
});

// JS import
task('js', function () {
  return src(jsLibs.concat(jsComponents).concat(jsMain))
  .pipe(sourcemaps.init())
  .pipe(concat('script.js'))
  .pipe(terser())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(dest(BUILD + '/js'));
});

// Оптимизация изображений
task("image", function () {
  return src([
    SASS + '/blocks/*/img/**/*.{png,jpeg,jpg,svg,gif}'
  ])
    .pipe(imagemin([
      optipng({
        optimizationLevel: 3
      }),
      jpegtran({
        progressive: true
      }),
      svgo({
        plugins: [
          {cleanupIDs: false},
          {removeUselessDefs: false},
          {removeViewBox: true},
          {removeComments: true}
        ]
      })
    ]))
  .pipe(flatten({
    includeParents : 3
  }))
  .pipe(rename(function(path) {
    // Переменная dirSep содержит разделитель директорий для
    // текущей ОС. Этот хак позволяет проводить сборку как в
    // Linux так и в Windows системах.
    var dirs = path.dirname.split(dirSep);

    if (dirs.length > 1) {
      dirs.splice(1, 1);
      path.dirname = dirs.join(dirSep)
    }
}))
  .pipe(dest(BUILD + '/img'));
});

// Конвертация в webp
task('webp', function () {
  return src(BUILD + '/img/**/*.{png,jpg}')
  .pipe(webp({
    quality: 90
  }))
  .pipe(dest(BUILD + '/img'));
});

// SVG спрайт
task('sprite', function () {
  return src(SASS + '/blocks/*/img/**/icon-*.svg')
  .pipe(imagemin([
    svgo({
      plugins: [
        {removeViewBox: false}
      ]
    })
  ]))
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(dest(SOURCE + '/includes'));
});

// Перенос файлов
task('copy', function () {
  return src([
    SOURCE + '/fonts/**/*.{woff,woff2}',
    SOURCE + '/favicons/*.{icon,png,svg}',
    SOURCE + '/manifest.json',
    SOURCE + '/libs/*.js',
    SOURCE + '/works/*.html',
    SOURCE + '/projects/**/*',
  ], {base: SOURCE})
  .pipe(dest(BUILD));
});

// Перенос работ
task('works', function () {
  return src(SOURCE + '/works/*.html', {base: SOURCE})
  .pipe(dest(BUILD));
});

// Удаление сборки
task('clear', function () {
  return del(BUILD);
});

// Сборка проекта
task('build', series(
  'clear',
  'copy',
  'image',
  'webp',
  'sprite',
  'html',
  'css',
  'js'
));

// Перезапус страницы
task('reload', function (done) {
  sync.reload();
  done();
});

// Live server
task('server', function () {
  sync.init({
    server: BUILD,
    port: 3000,
    notify: false
  });

  watch(SOURCE + '/*.html', series('html')).on('change', sync.reload);
  watch(SOURCE + '/works/*.html', series('works')).on('change', sync.reload);
  watch(SOURCE + '/includes/*.html', series('html')).on('change', sync.reload);
  watch(SASS + '/**/*.{sass,scss}', {usePolling: true}, series('css'));
  watch(JS + '/**/*.js', {usePolling: true}, series('js')).on('change', sync.reload);
  watch(SASS + '/**/icon-*.svg', series('sprite', 'html', 'reload'));
});

// Запуск сборки
task('start', series('build', 'server'));
