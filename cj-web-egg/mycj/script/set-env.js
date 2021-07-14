process.chdir(__dirname);
const fs = require('fs');
const path = require('path');
const argv = require('optimist').argv;
const { PAHT } = require('../config/config');

const TAG = '[set-env.js]';

module.exports = function () {
  const NODE_ENV = argv.env;

  // 写入构建信息
  const data = `
// 构建时间
exports.BUILD_TIMESTAMP = '${Date.now()}';
// 构建环境
exports.NODE_ENV = '${NODE_ENV}';
`;

  try {
    fs.writeFileSync(path.join(PAHT.ABS.root, 'env.js'), data);
    console.log(TAG, '✈️ 写入全局环境', NODE_ENV);
  } catch (e) {
    console.log(TAG, e);
  } finally {
    return argv.env;
  }
};
