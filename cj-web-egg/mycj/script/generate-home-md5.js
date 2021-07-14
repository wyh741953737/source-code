/**
 * 主要是为了 myCJ 外面页面使用 md5 更新 js、css、component
 * 1、根据路径生成 md5
 * 2、内部维护一个 md5 字典 [md5_dict]
 * 3、生成 dist/static-md5.json
 */

const fs = require('fs');
const path = require('path');
const md5 = require('md5');


const md5_dict = {};
const dist_path = path.join(__dirname, '../dist');
const assemble_path = p => path.join(dist_path, p);
const timestamp = Date.now();
let timer = null;

exports.get_md5_by_path = function ({ path: _path, len }) {
  if (!md5_dict[_path]) {
    try {
      const fullpath = assemble_path(_path);
      const buffer = fs.readFileSync(fullpath);
      const _md5 = md5(buffer);
      md5_dict[_path] = _md5;
    } catch (e) {
      md5_dict[_path] = timestamp; // 有报错，使用构建时间
      console.log('[handle-md5] md5 生成报错 💥💥💥💥 可以忽略，不必纠结 💥💥💥💥');
      console.log(e.message, '\n');
    }
  }

  clearTimeout(timer);
  timer = setTimeout(() => write_md5_map(md5_dict), 400);

  let str = md5_dict[_path];
  if (typeof len === 'number' && typeof str === 'string') {
    str = str.substr(0, len);
  }
  return str;
};

function write_md5_map(md5_dict) {
  const json = JSON.stringify(md5_dict, null, 2);
  fs.writeFile(path.join(dist_path, 'static-md5.json'), json, (err) => {
    if (!err) {
      console.log('[handle-md5] 已生成 md5 ->', 'dist/static-md5.json');
    }
  });
}
