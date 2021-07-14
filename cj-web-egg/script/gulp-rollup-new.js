const gulp = require('gulp')
const rollupEach = require('gulp-rollup-each')
const path = require('path')
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const alias = require('@rollup/plugin-alias');
const json = require('@rollup/plugin-json');
const VuePlugin = require('rollup-plugin-vue');
const sourcemaps = require('gulp-sourcemaps');
const changed = require('gulp-changed');
const chalk = require('chalk');
const rename = require('gulp-rename')

const root_path = path.join(__dirname, '..')
const resolve_path = (filePath) => path.join(root_path, filePath)

const log = log => console.log(chalk.green('[script/gulp.js]'), (new Date).toLocaleString(), log);
const assemble_file = f => f.replace(new RegExp(`\\/\\w+\\.js$`), '.js');

const dest_script_path = resolve_path('/dist/public/egg/script/')

exports.compileJsNew = function () {
  return gulp
    .src(resolve_path('/public/egg/script/*/index.js'))
    .on('end', () => log(chalk.green('*.js bundle done')))
    .pipe(changed(dest_script_path))
    .pipe(sourcemaps.init())
    .pipe(
      rollupEach({
        plugins: [
          resolve({ jsnext: true, preferBuiltins: true, browser: true }), // 消除碰到 node.js 模块时⚠警告
          commonjs(),
          VuePlugin(),
          json(),
          alias({
            entries: [
              { find: '@root', replacement: path.join(__dirname, '..') },
              { find: '@common', replacement: path.join(__dirname, '../common') },
            ],
          }),
          babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: [
              ["@babel/preset-env", {
                // 否则 Babel 会在 Rollup 有机会做处理之前，将我们的模块转成 CommonJS ，导致 Rollup 的一些处理失败。
                // 好像不设置也行 20-04-24 (官方推荐设置 false)
              }]
            ],
            plugins: [
              // 允许 Rollup 在包的顶部只引用一次 helpers ，而不是每个使用它们的模块中都引用一遍（这是默认行为）
              // 20-04-25
              // Using "external-helpers" plugin with rollup-plugin-babel is deprecated, as it now automatically deduplicates your Babel helpers.
              // "@babel/external-helpers"
            ]
          }),
        ],
        external: [
          'i18next'
        ],
        isCache: true
      },
        file => {
          // const fileName = assemble_file(file.path).replace('public', 'dist/public')
          // log(fileName)
          return {
            globals: {
              i18next: 'i18next',
            },
            format: 'umd',
            name: path.basename(file.path, '.js')
          }
        }
      )
    )
    .pipe(rename(function (path) {
      path.basename = path.dirname
      path.dirname = '/'
      return path
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dest_script_path))
}

