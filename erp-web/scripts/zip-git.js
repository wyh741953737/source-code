/**
 * 1、将项目打包成 zip 包
 * 参考链接 [https://www.archiverjs.com]
 * 2、git 还原操作
 */

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const gulp = require('gulp');
const zip = require('gulp-zip');

const gulp_ignore = [
  'node_modules',
  'dist',
  'scripts',
  'css',
  '\.vscode',
  '\.idea',
  '\.DS_Store',
];

process.chdir(__dirname);
console.log('[zip-git.js]:', '开始打包压缩');
gulp.src([
  '../**',
  ...gulp_ignore.map(_ => `!../${_}/**`),
])
  .pipe(zip('webapp.zip'))
  .pipe(gulp.dest(path.relative(__dirname, '../dist')))
  .on('end', () => {
    console.log('[zip-git.js]:', '压缩已完成 ---- 开始 git 回滚');
    process.chdir(path.join(__dirname, '..'));
    setTimeout(() => {
      childProcess.execSync('git checkout .');
      console.log('[zip-git.js]:', 'git 回滚已完成');
    }, 999); // 延迟执行 git 命令 [习惯性任务切分 ^_^]
  });
