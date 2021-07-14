/**
 * 一些发开辅助的 gulp 任务
 */
process.chdir(__dirname);
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps')
const less = require('gulp-less');
const argv = require('optimist').argv;
const chalk = require('chalk');
const { compileJsNew } = require('./gulp-rollup-new')

const changed = require('gulp-changed');
const { cleanPublic, copyPublicFiles, copyEggViews, md5Css, md5Js, replaceNjk } = require('./gulp-md5');
const { versionScriptAndCss: versionMyCjPublic } = require('./gulp-version-public')
const { cjCacheInit } = require('./gulp-cache-init')

const TAG = '[script/gulp.js]';
let requireENV = 'development'
try {
  requireENV = require('../env').NODE_ENV;
} catch (e) {
  console.log(TAG, chalk.red(`未加载到 env.js 默认模式 ${requireENV}`));
}
const NODE_ENV = argv.env ? argv.env : requireENV;
const isDev = NODE_ENV === 'development';
const isProduction = NODE_ENV === 'production' || NODE_ENV === 'production-cn';
const public = '../public/egg';

const log = log => console.log(chalk.green('[script/gulp.js]'), (new Date).toLocaleString(), log);

// 自动化编译 public 下的 less 文件
const style_path = `${public}/style`;
const style_glob = `${style_path}/less/*.less`;
const style_dest = `../dist/public/egg/style`
function compileLess() {
  const glob = [style_glob, `!${style_path}/less/common.less`];
  return gulp.src(glob)
    .pipe(changed(style_dest))
    .on('end', () => log(chalk.green('task *.less done.')))
    .on('error', err => console.log(TAG, err))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(style_dest))
}

// 自动化打包 public/xxxx/script/*/index.js
const js_path = `${public}/script`;
const js_glob = [
  `${js_path}/*/**/*.js`,
  `${js_path}/*/**/*.vue`,
  '../common/**/*.js', // 服务端、客户端 公用部分
];

// 开发模式下实时编译
if (isDev) {
  const done = cb1 => cb2 => { cb1(); cb2(); };
  gulp.watch(style_glob, function (cb) {
    gulp.parallel([compileLess, done(cb)])();
  });
  gulp.watch(js_glob, function (cb) {
    gulp.parallel([compileJsNew, done(cb)])();
  });
  gulp.watch([
    '../public/egg/image',
    '../public/egg/libs',
    '../public/lang',
    '../public/icons',
    '../public/*.*'
  ], function (cb) {
    gulp.parallel([copyPublicFiles, done(cb)])()
  })
}

// 如果有些任务被 gulp-watch 独立接管
// 那么 parallel 就十分的有用
// series 会阻塞在一个 gulp-watch 后面没法继续下去
const tasks = [copyPublicFiles, compileJsNew, compileLess]
if (!isDev) {
  tasks.push(copyEggViews, md5Js, md5Css, replaceNjk, versionMyCjPublic)
}
if (isProduction) {
  // 针对线上环境初始化缓存兜底数据
  tasks.push(cjCacheInit);
}
gulp[isDev ? 'parallel' : 'series'](...tasks)()