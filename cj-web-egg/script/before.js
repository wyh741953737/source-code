/**
 * 启动之前干点儿啥
 */
const fs = require('fs');
const path = require('path');
const argv = require('optimist').argv;

const cache_timestamp = `${Date.now()}`

// 全局 NODE_ENV
const env_data = `
exports.NODE_ENV = '${argv.env}';
exports.TIMESTAMP = '${cache_timestamp}';
exports.BUILD_TIMESTAMP = '${cache_timestamp}';
`;
fs.writeFileSync(path.join(__dirname, '../env.js'), env_data);
