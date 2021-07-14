const fs = require('fs');
const path = require('path');
const through2 = require('through2');
const config = require('./update-config');
const handleMD5 = require('./generate-home-md5');
const { BUILD_TIMESTAMP, NODE_ENV } = require('../env');


const updateTime = Date.now(); // 更新时间

exports.updateHtml = function () {
  return through2.obj((file, _, cb) => {
    const htmlCode = file.contents.toString(); // 代码内容

    file.contents = Buffer.from(updateHtmlHandel(htmlCode, updateCallback));

    cb(null, file); // cb(error、file)
  });
};

exports.updateComponent = function () {
  return through2.obj((file, _, cb) => {
    const compCode = file.contents.toString(); // 代码内容

    file.contents = Buffer.from(updateComponentHandle(compCode));

    cb(null, file); // cb(error、file)
  });
};

/** 更新 html 中的 script、link */
function updateHtmlHandel(html, callback) {
  let scriptTags = [];
  let linkTags = [];

  // <script src="static/js/public/config.js">
  const reg1 = html
    .match(/src=('|")[\.\/]*static[\w\/\-\.]+\.js(\?v=\w+)?('|")/g);
  // <link rel="stylesheet" type="text/css" href="static/css/reset.css">
  const reg2 = html
    .match(/href=('|")[\.\/]*static[\w\/\-\.]+\.css(\?v=\w+)?('|")/g);

  scriptTags = Array.isArray(reg1) ? reg1 : [];
  scriptTags = scriptTags
    .map(str => str.match(/static[\w\/\-\.]+\.js(\?v=\w+)?/)[0])
    .filter(str => !config.ignoreScripts.find(_ => str.includes(_)));
  linkTags = Array.isArray(reg2) ? reg2 : [];
  linkTags = linkTags
    .map(str => str.match(/static[\w\/\-\.]+\.css(\?v=\w+)?/)[0])
    .filter(str => !config.ignoreLinks.find(_ => str.includes(_)));

  // console.log(scriptTags);
  // console.log(linkTags);
  // process.exit(0);

  scriptTags.forEach(str => {
    const src = str.replace(/\?v=\w+/, '');
    // html = html.replace(str, `${src}?v=${updateTime}`); // 时间戳版本号
    html = html.replace(str, `${src}?v=${handleMD5.get_md5_by_path({ path: src, len: 9 })}`); // md5 版本号
    if (typeof callback === 'function') html = callback('script', html);
  });
  linkTags.forEach(str => {
    const href = str.replace(/\?v=\w+/, '');
    // html = html.replace(str, `${href}?v=${updateTime}`); // 时间戳版本号
    html = html.replace(str, `${href}?v=${handleMD5.get_md5_by_path({ path: href, len: 9 })}`); // md5 版本号
    if (typeof callback === 'function') html = callback('link', html);
  });

  return html;
}

function updateComponentHandle(compJs) {
  // templateUrl: './static/components/cart/cart.html',
  const reg1 = compJs
    .match(/templateUrl[\s\n]*:[\s\n]*('|")[\w\/\-\.]+\.html(\?v=\w+)?('|")/g);
  let templateUrls = Array.isArray(reg1) ? reg1 : [];

  templateUrls = templateUrls.map(url => {
    return url.match(/(?<=(:[\s\n]*)('|"))[\w\/\-\.]+\.html(\?v=\w+)?/)[0];
  });

  templateUrls.forEach((tplUrl) => {
    const url = tplUrl.replace(/\?v=\w+/, '');
    // compJs = compJs.replace(tplUrl, `${url}?v=${updateTime}`); // 时间戳版本号
    compJs = compJs.replace(tplUrl, `${url}?v=${handleMD5.get_md5_by_path({ path: url, len: 9 })}`); // md5 版本号
  });

  return compJs;
}

/** 
 * 更新时的一些中间处理程序
 * cmd === 'script' 代表更新 html 模板 script 标签
 * cmd === 'link' 代表更新 html 模板 link 标签
 * cmd === 'component 代表更新 component 组件
 */
function updateCallback(cmd = '', data = '') {
  if (cmd === 'script') {
    // https://miandan.cjdropshipping.com/js-lib/utils.1.0.0.js 处理
    const suffix = /-cn$/.test(NODE_ENV) ? 'cn' : 'com';
    const href = `miandan.cjdropshipping.${suffix}/js-lib/utils.1.0.0.js?v=${BUILD_TIMESTAMP}`;
    const utilsRegex = /miandan\.cjdropshipping\.(com|cn)\/js-lib\/utils\.1\.0\.0\.js(\?v=\w+)?/;
    data = data.replace(utilsRegex, href);

  } else if (cmd === 'link') {
    // pages/**/*.css
    const reg1 = data.match(/href=('|")[\.\/]*pages[\w\/\-\.]+\.css(\?v=\w+)?('|")/g);
    const hrefs = Array.isArray(reg1) ? reg1 : [];
    hrefs
      .map(href => href.match(/pages[\w\/\-\.]+\.css(\?v=\w+)?/)[0])
      .forEach(href => {
        const _href = href.replace(/\?v=\w+/, '');
        data = data.replace(href, `${_href}?v=${handleMD5.get_md5_by_path({ path: _href, len: 9 })}`);
      });
  }

  return data;
}

/** 向 config.js 中插入构建信息 */
exports.insertIntoConfig = function (code = '') {
  return through2.obj((file, _, cb) => {
    const jsCode = file.contents.toString(); // 代码内容

    file.contents = Buffer.from(jsCode + code);
    cb(null, file);
  });
};

/** 生成预加载 js 标签 */
exports.insertIntoLinks = function (code = '') {
  return through2.obj((file, _, cb) => {
    let htmlCode = file.contents.toString(); // 代码内容

    htmlCode = htmlCode.replace(/<\/\s*head>/, `
  ${code}
</head>`);

    file.contents = Buffer.from(htmlCode);
    cb(null, file);
  });
};