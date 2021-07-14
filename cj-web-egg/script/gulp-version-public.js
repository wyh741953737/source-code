var through = require('through2');
const gulp = require('gulp')
const chalk = require('chalk')
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

const temp = new Date().getTime()

// 常量
const PLUGIN_NAME = 'gulp-version-script-css';

const log = log => console.log(chalk.green('[script/gulp.js]'), (new Date).toLocaleString(), log);

// <script src="static/js/public/config.js">
const regScript = (html) => html.match(/src=('|")[\.\/]*(static|egg\/script)[\w\/\-\.]+\.js(\?v=\w+)?('|")/g);
// <link rel="stylesheet" type="text/css" href="static/css/reset.css">
const regCss = (html) => html.match(/href=('|")[\.\/]*(static|pages\/mycj)[\w\/\-\.]+\.css(\?v=\w+)?('|")/g);

// 插件级别的函数（处理文件）
function gulpVersionScriptCss(timestamp) {
  if (!timestamp) {
    throw new PluginError(PLUGIN_NAME, 'Missing timestamp!');
  }

  // 创建一个 stream 通道，以让每个文件通过
  var stream = through.obj(function (file, enc, cb) {

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      let htmlTemp = file.contents.toString()
      const scriptSrc = regScript(htmlTemp) || []
      const cssHref = regCss(htmlTemp) || []

      scriptSrc.forEach(src => {
        if (src.indexOf('?') === -1) {
          let _src = src.replace('.js', `.js?v=${timestamp}`)
          htmlTemp = htmlTemp.replace(src, _src)
        }
      })

      cssHref.forEach(href => {
        if (href.indexOf('?') === -1) {
          let _href = href.replace('.css', `.css?v=${timestamp}`)
          htmlTemp = htmlTemp.replace(href, _href)
        }
      })

      file.contents = Buffer.from(htmlTemp);
    }

    // 确保文件进入下一个 gulp 插件
    this.push(file);

    // 告诉 stream 引擎，我们已经处理完了这个文件
    cb();
  });

  // 返回文件 stream
  return stream;
};

function versionScriptAndCss() {
  return gulp.src('../dist/mycj-public/*.html')
    .on('end', () => log(chalk.green('mycj-public version done')))
    .pipe(gulpVersionScriptCss(temp))
    .pipe(gulp.dest('../dist/mycj-public'))
}

exports.versionScriptAndCss = versionScriptAndCss
// gulp.series(versionScriptAndCss)()