process.chdir(__dirname); // 将 process.cwd() 指向当前目录

/**
 * 打包后的项目，清理缓存并压缩
 */

const path = require('path');
const gulp = require('gulp');
const zip = require('gulp-zip');
const plugins = require('./update-gulp-plugins');
const assemble_script = require('./generate-build-info');
const generate_links = require('./generate-preload');


function updateHtml() {
  const _path = '../dist';

  /** 记个坑 gulp.src 会从程序执行的 process.cwd() 为准 */
  return gulp.src(`${_path}/*.html`)
    .pipe(plugins.updateHtml())
    .pipe(gulp.dest(_path))
    .on('end', () => {
      console.log('[update-zip] html 更新完成');
    });
}

function updateComponent() {
  const _path = '../dist/static/components';

  return gulp.src(`${_path}/**/*.js`)
    .pipe(plugins.updateComponent())
    .pipe(gulp.dest(_path))
    .on('end', () => {
      console.log('[update-zip] component 更新完成');
    });
}

function insertIntoBuildInfo() {
  const _path = '../dist/static/js/public';
  // dist/static/js/public/config.js

  return new Promise(async resolve => {
    const code = await assemble_script();

    gulp.src(`${_path}/config.js`)
      .pipe(plugins.insertIntoConfig(code))
      .pipe(gulp.dest(_path))
      .on('end', () => {
        console.log('[update-zip] config.js 生成构建信息');
        resolve(null);
      });
  });
}

function insertPreloadLinks() {
  const _path = '../dist';
  const links = generate_links(path.join(__dirname, '../dist/_js'));

  return gulp.src(`${_path}/myCJ.html`)
    .pipe(plugins.insertIntoLinks(links))
    .pipe(gulp.dest(_path))
    .on('end', () => {
      console.log('[update-zip] 预加载 link 标签生成');
    });
}

function zipDist() {
  const _path = '../dist';

  return gulp.src(`${_path}/**`)
    .pipe(zip('web.zip'))
    .pipe(gulp.dest(_path))
    .on('end', () => {
      console.log('[update-zip] 压缩完成 -> dist/web.zip');
    });
}

gulp.series([
  updateHtml,
  updateComponent,
  insertIntoBuildInfo,
  insertPreloadLinks,
  zipDist,
  cb => {
    console.log('[update-zip] 🍺 你是最棒哒 ^_^');
    cb();
  }])();
