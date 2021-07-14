/**
 * application 的擴展在 app.js 中自定義啓動生命週期中也可以實現 ^_^
 */
require('module-alias/register');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const utils = require('@root/common/utils');
const { NODE_ENV } = require('@root/env');

const isDev = NODE_ENV === 'development';
const $root = path.join(__dirname, '../../');
const cachePath = path.join($root, 'cj-cache');

// 递归创建目录 [20-03-28 貌似 mkdir 自带 😒]
function mkdirSync(_path = '') {
  const date = `[${new Date().toLocaleString()}]`;
  let res = true;
  try {
    _path.split(path.sep).reduce((acc, cur, idx, arr) => {
      // Users
      // Users/caoxie
      // Users/caoxie/Desktop
      // Users/caoxie/Desktop/cckj
      // Users/caoxie/Desktop/cckj/cj-web-egg
      // Users/caoxie/Desktop/cckj/cj-web-egg/cj-cache
      // Users/caoxie/Desktop/cckj/cj-web-egg/cj-cache/home
      const p = path.join(acc, cur);
      if (idx !== arr.length - 1) { // 避开最后的文件标识
        fs.existsSync(p) || fs.mkdirSync(p);
      }
      return p;
    });
  } catch (e) {
    if (isDev) {
      console.log(e);
      console.log(date, chalk.red('创建目录失败'), _path);
    }
    res = false;
  } finally {
    return res;
  }
}

// 递归创建目录
function mkdirSync2(_path = '') {
  const date = `[${new Date().toLocaleString()}]`;
  let res = true;
  try {
    const p = _path.split(path.sep).filter((_, i, arr) => i !== arr.length - 1).join(path.sep);
    fs.existsSync(p) || fs.mkdirSync(p, { recursive: true });
  } catch (e) {
    res = false;
    if (isDev) {
      console.log(e);
      console.log(date, chalk.red('创建目录失败'), _path);
    }
  } finally {
    return res;
  }
}

// 写入文件
function writeFile(dist, opt) {
  const _opt = {
    data: '',
    sync: true,
    append: false,
    ...opt,
  };
  const date = `[${new Date().toLocaleString()}]`;
  const log_err = log => {
    if (isDev) {
      console.log(log);
      console.log(date, chalk.red('写入失败'), dist);
    }
  };
  const log_succ = () => isDev && console.log(date, '写入成功', dist);
  if (mkdirSync2(dist)) {
    if (_opt.sync) {
      const handle = _opt.append ? fs.appendFileSync : fs.writeFileSync;
      try {
        handle(dist, _opt.data);
        log_succ();
      } catch (e) {
        log_err(e);
      }
    } else {
      const handle = _opt.append ? fs.appendFile : fs.writeFile;
      handle(dist, _opt.data, err => {
        err ? log_err(err) : log_succ();
      });
    }
  }
}

// 读取文件
function readFile(dist, opt = {}) {
  const date = `[${new Date().toLocaleString()}]`;
  const { parse = false, sync = true } = opt;
  const res = [];
  const log_err = log => {
    if (isDev) {
      console.log(log);
      console.log(date, chalk.red('读取失败'), dist);
    }
  };
  if (sync) {
    try {
      const d = fs.readFileSync(dist, { encoding: 'UTF-8' });
      res[0] = null;
      res[1] = parse ? JSON.parse(d) : d;
    } catch (e) {
      log_err(e);
      res[0] = e;
    } finally {
      return res;
    }
  } else {
    return new Promise(resolve => {
      fs.readFile(dist, { encoding: 'UTF-8' }, (err, data) => {
        if (err) {
          log_err(err);
          resolve([err]);
        } else {
          if (parse) {
            const [e, d] = utils.JSONparse(data);
            if (e) {
              log_err(e);
              resolve([e]);
            } else {
              resolve([null, d]);
            }
          } else {
            resolve([null, data]);
          }
        }
      });
    });
  }
}

const $axios = utils.axiosEnhance(new utils.Axios);
$axios.post = utils.axiosEnhance(new utils.Axios({ method: 'POST' }));

const $ajax = utils.ajax;

module.exports = {
  $axios,
  $ajax,
  apiPrefix: url => utils.getDomainByUrl(url),
  // 开发期调试用
  writeToTmp(dist, data) {
    writeFile(path.join($root, '\.tmp', dist), { data });
  },
  // 写入 log
  writeToLog(dist, log, append = false) { // 默认 fase 避免可能乱用日志造成的日志过大问题
    const data = `
${(new Date).toLocaleString()}
${log}`;
    writeFile(path.join($root, 'cj-log', dist), { data, append });
  },
  // 写入缓存
  writeToCache(dist, opt) {
    const _opt = {
      stringify: true, // 是否 JSON.stringify
      data: '',        // 写入的数据
      sync: false,     // 是否同步写入
      ...opt,
    };
    const { stringify, data, sync } = _opt;
    let _data = data;
    if (data && typeof data == 'object' && stringify) {
      try {
        _data = JSON.stringify(_data);
      } finally { }
    }
    writeFile(path.join(cachePath, dist), { data: _data, sync });
  },
  // 读取缓存
  readFromCache(dist, opt) {
    const _opt = {
      parse: true, // 是否 JSON.parse
      sync: true,  // 是否同步读取
      ...opt,
    };
    return readFile(path.join(cachePath, dist), _opt);
  },
};
