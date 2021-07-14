/**
 * 辅助构建
 */
const less = require('less');
const { NODE_ENV } = require('../../env');

module.exports = function (lesscss, path) {
  return new Promise(resolve => {
    less.render(lesscss, (err, output) => {
      if (err) {
        console.log('---- 编译less报错 ----');
        console.log('[报错文件]', path);
        console.log(`[报错位置] 第${err.line}行`);
        if(NODE_ENV === 'development') {
          // 开发环境不退出
          resolve('')
          return
        }
        process.exit(0)
      } else {
        if (typeof output !== 'object') {
          return;
        }
        const { css, map } = output;
        resolve(css);
      }
    });
  });
}
