
/**
 * 生成构建信息
 * 在浏览器中输入 “构建信息” 即可查看构建信息
 */

const fs = require('fs');
const path = require('path');
const simple_git = require('simple-git');
const build_info = require('../env');

const git = simple_git(path.join(__dirname, '../'));


module.exports = async () => {
  const info = await get_build_info();

  return `
;window.BUILD_INFO = ${JSON.stringify(info)};
Object.defineProperty(window, '构建信息', {
  get() {
    console.table(window.BUILD_INFO);
    return window.BUILD_INFO;
  }
});
`;
};

async function get_build_info() {
  const [err, logs] = await get_logs(2);
  const build_date = `${new Date(+build_info.BUILD_TIMESTAMP).toLocaleString()} | 时间戳：${build_info.BUILD_TIMESTAMP}`;
  const git_info = logs.map(log => `日志：${log.Message} | 作者：${log.Author} | 日期：${log.Date}|版本：${log.Hash}`).join(' |----| ');

  return {
    '构建环境': build_info.NODE_ENV,
    '构建时间': build_date,
    '最近两次git信息': git_info,
  };
};

/**
 * git log 信息
 * @param {Number}} size log 条数
 */
function get_logs(size = 9) {
  const log_processor = logs => {
    const tmp = logs.split('commit ').filter(_ => _);
    const log_arr = [];

    /**
     * 1. ```?=``` ： 询问后面跟着的东西是否等于这个    /b(?=a)/.test('bab')
     * 2. ```?<=``` ： 询问是否以这个东西开头  /(?<=a)b/.test('ab')
     * 3. ```?!``` : 询问后面跟着的东西是否不是这个  /b(?!a)/.test('bb')
     * 4. ```?<!=``` ：询问是否不是以这个东西开头  /(?<!=a)b/.test('bb')
     */
    tmp.forEach(log => {
      let Hash = log.match(/^(\w+).*/);
      let Author = log.match(/((?<=\n)Author:\s+(.*))/);
      let Date_ = log.match(/((?<=\n)Date:\s+(.*))/);
      let Message = log.match(/(?<=\n\n)(.*)\n\n/);

      log_arr.push({
        Hash: Hash ? Hash[0] : '',
        Author: Author ? Author[2] : '',
        Date: Date_ ? Date_[2] : '',
        Message: (Message ? Message[1] : '').replace('    ', ''),
      });
    });

    return log_arr;
  }

  return new Promise(resolve => {
    git.raw(['log', '-' + size], (err, logs) => {
      if (err) {
        console.log('[generate-build-info] 命令: git log 报错 💥💥💥💥 可以忽略，不必纠结 💥💥💥💥');
        resolve([err]);
        return;
      }

      resolve([null, log_processor(logs)]);
    });
  });
}
