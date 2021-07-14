/**
 * 生成预加载 js 标签
 * <link rel="preload" href="xxx.js" as="script">
 */

const fs = require('fs');
const path = require('path');


module.exports = abs_path => {
  let links = [];

  try {
    const dirs = fs.readdirSync(abs_path)
      .filter(name => name.startsWith('chunk~') && name.endsWith('.js'));
    links = dirs.map(name => `<link rel="prefetch" href="_js/${name}" as="script">`);
  } catch (e) {
    console.log('[generate-prefetch] 读取 dist/_js/**.js 失败，会影响项目预加载性能');
    console.log(e);
  }

  return links.join('\n');
}
