process.chdir(__dirname); // 将 process.cwd() 指向当前目录

/**
 * webpack 构建前，生成静态文件 md5
 * 此脚本只负责 src 下的静态文件文件
 */

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const md5 = require('md5');
const through2 = require('through2');

module.exports = function ({ NODE_ENV, PAGES_PATH }) {
  const isDev = NODE_ENV === 'development';
  const MD5_PAGES_PATH = path.join(PAGES_PATH, 'pages-md5.js');

  let MD5_MAP = {};
  let MD5_DIST_PATH = null;

  function generateMD5($path) {
    return through2.obj((file, _, cb) => {
      // 考虑到为多个目录设计，目前只生成了 src/pages 下的 md5，if 判断显得没有意义
      // 如果增加目录，如 src/commponents 目录，if 判断就很有必要了
      if (MD5_DIST_PATH !== $path) {
        MD5_MAP = {};
        MD5_DIST_PATH = $path;
      }
      const _path = `src${file.path.split('src')[1]}`;
      MD5_MAP[_path] = md5(file.contents);

      cb(null, file);
    })
  }

  function generatePges_MD5() {
    return gulp
      .src(['../src/pages/**/*.html', '../src/pages/**/*.less'])
      .pipe(generateMD5(MD5_PAGES_PATH))
      .on('end', () => {
        console.log('[update-zip] MD5 生成完成');
      });
  }

  function write_MD5(cb) {
    const data = `export default ${JSON.stringify(MD5_MAP, null, 2)};`;

    try {
      fs.writeFileSync(MD5_DIST_PATH, data);
    } catch (e) {
      console.log(e.stack);
      console.log('[update-zip] MD5 写入失败 ->', MD5_DIST_PATH);
      process.exit(0);
    } finally {
      console.log('[update-zip] MD5 写入完成 ->', MD5_DIST_PATH);
      cb();
    }
  }

  function generatePges_MD5_DEV(cb) {
    // 生产环境下，出于编译性能考虑，不生成 md5
    MD5_DIST_PATH = MD5_PAGES_PATH;
    MD5_MAP = {};
    cb();
  }

  gulp.series([
    isDev ? generatePges_MD5_DEV : generatePges_MD5,
    write_MD5,
  ])();

};
