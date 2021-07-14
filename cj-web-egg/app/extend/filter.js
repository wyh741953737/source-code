require('module-alias/register');
const filter = require('@root/common/filter');

// 生成 md5 散列，更新缓存
function VERSION(url) {

  return `${url}`;
}

module.exports = {
  VERSION,
  ...filter
};