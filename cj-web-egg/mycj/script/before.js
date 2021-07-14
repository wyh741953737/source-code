process.chdir(__dirname);
// const path = require('path');
const { PAHT } = require('../config/config');

// 设置 NODE_ENV
// const NODE_ENV = require('./set-env')();

// 生成 mycj/src 下的 md5
require('./generate-src-md5')({ PAGES_PATH: PAHT.ABS.pages });