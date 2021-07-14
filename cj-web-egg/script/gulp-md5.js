/**
 * @description md5文件名  针对css js
 */


const gulp = require('gulp')
const rev = require("gulp-rev")
const clean = require('gulp-clean');
const changed = require('gulp-changed');
const revCollector = require('gulp-rev-collector');
const chalk = require('chalk');

const DEST_ROOT_PATH = '../dist' // 目标根目录
const SOURCE_EGG_PUBLIC = '../public/egg' // 开发环境的egg目录
const DEST_EGG_PUBLIC = DEST_ROOT_PATH + '/public/egg' // 目标egg目录

const log = log => console.log(chalk.green('[script/gulp.js]'), (new Date).toLocaleString(), log);

exports.cleanPublic = function () {
  return gulp.src([
    '../dist/public',
    '../dist/view'
  ], { allowEmpty: true })
    .on('end', () => log(chalk.green('cleanPublic done')))
    .pipe(clean({ force: true }))

}

/** 整个copy egg public 静态资源目录 image目录和libs目录*/
exports.copyPublicFiles = function () {
  return gulp.src([
    `${SOURCE_EGG_PUBLIC}/image/**/*`,
    `${SOURCE_EGG_PUBLIC}/libs/**/*`,
    `../public/lang/**/*`,
    `../public/icons/*`,
    `../public/*.*`,
  ], { base: 'public' })
    .on('end', () => log(chalk.green('copyPublicFiles done')))
    .pipe(changed(DEST_EGG_PUBLIC))
    .pipe(gulp.dest(DEST_EGG_PUBLIC))
}

/** copy 整个view njk模版 */
const SOURCE_EGG_VIEW = '../app/view'
const DEST_EGG_VIEW = '../dist/view'
exports.copyEggViews = function () {
  return gulp.src([
    `${SOURCE_EGG_VIEW}/**/*.njk`,
  ])
    .on('end', () => log(chalk.green('copyEggViews done')))
    .pipe(gulp.dest(DEST_EGG_VIEW))

}

/** md5 css */
exports.md5Css = function () {
  return gulp.src([
    DEST_EGG_PUBLIC + '/style/*.css'
  ])
    .on('end', () => log(chalk.green('md5 css done')))
    .pipe(rev())
    .pipe(gulp.dest(DEST_EGG_PUBLIC + '/md5-style'))
    .pipe(rev.manifest('./css-rev-manifest.json'))
    .pipe(gulp.dest(DEST_ROOT_PATH))
}

/** md5 js */
exports.md5Js = function () {
  return gulp.src([
    DEST_EGG_PUBLIC + '/script/*.js'
  ])
    .on('end', () => log(chalk.green('md5 js done')))
    .pipe(rev())
    .pipe(gulp.dest(DEST_EGG_PUBLIC + '/md5-script'))
    .pipe(rev.manifest('./js-rev-manifest.json'))
    .pipe(gulp.dest(DEST_ROOT_PATH))
}

/** 替换njk 中的资源 */
exports.replaceNjk = function () {
  return gulp.src(['../dist/*-rev-manifest.json', DEST_EGG_VIEW + '/**/*.njk'])
    .on('end', () => log(chalk.green('replaceNjk done')))
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest(DEST_EGG_VIEW))
}