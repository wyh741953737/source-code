process.chdir(__dirname);
const webpack = require('webpack');
const chalk = require('chalk');
const ora = require('ora');
const argv = require('optimist').argv;
const configFactory = require('../config/webpack.config');
const { NODE_ENV } = require('../../env');


const TAG = '[script/build.js]';
const spinner = ora('MyCJ webpack build...');

const webpackConfig = configFactory(NODE_ENV);
const compiler = webpack(webpackConfig);

const isDevMode = argv.watch; // 开发模式

compiler.hooks.beforeCompile.tap(TAG, () => spinner.start());

// 开发模式 node build.js --watch
let watching = null;
if (isDevMode) {
  watching = compiler.watch({
    // 如果监听没生效，试试这个选项吧
    // Watch 在 NFS 和 VirtualBox 机器上不适用。
    // poll: 1000, // 每秒检查一次变动

    // 当第一个文件更改，会在重新构建前增加延迟
    // 这个选项允许 webpack 将这段时间内进行的任何其他更改都聚合到一次重新构建里
    aggregateTimeout: 140,

    // 我也不知道当初为啥要写下面的过滤器，脑子被驴踹了 :( 20-03-06
    // 排除 node_modules  mycj/src
    // 正则参考：https://blog.csdn.net/ht99582/article/details/37754903?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task
    // ignored: [/node_modules/, /^((?!(mycj\/src)).)*$/]

  }, compileHandle);
} else {
  // 构建模式
  compiler.run(compileHandle);
}

function compileHandle(err, stats) {
  // 20-02-25 构建日志控制，还木搞定 = =
  // console.log(stats.compilation.records);
  spinner.stop();

  if (err) {
    // err 对象将只包含与webpack相关的问题，例如错误配置等
    console.log(TAG, chalk.red('💥 webpack 相关报错'));
    watching && watching.close(() => console.log(TAG, 'Watching Ended.'));
  } else if (stats.hasErrors()) {
    // webpack 编译报错
    const json = stats.toJson('errors-only');
    // fs.writeFileSync(path.join(__dirname, './\.tmp/errors.json'), JSON.stringify(json, null, 2));
    console.log(TAG, filterLogs(json.errors)().join('\n'));
    console.log(TAG, chalk.red('💥 编译报错'));
  } else {
    isDevMode && console.log(TAG, (new Date).toLocaleString(), chalk.yellow(`Wating for files changes...`));
  }
}

/**
 * webpack 日志过滤
 */
function filterLogs(errors) {
  let tmp = [];
  return function (filter = true) {
    if (filter) {
      errors.forEach(err => {
        if (err.includes('Error: Child compilation failed:')) {
          // 忽略 webpack 内部调用错误栈
          return;
        }
        if (!tmp.find(_ => _.split('\n')[1] === err.split('\n')[1])) {
          // 一个错误，可能会被爆出多次，做下报错去重
          // 比如一个 loader 报错，那么 n 个文件经过 loader 就会报出 n 个错误
          tmp.push(err);
        }
      });
    } else {
      tmp = errors;
    }
    return tmp;
  }
}
