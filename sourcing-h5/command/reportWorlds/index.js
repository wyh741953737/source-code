/**
 * 上报翻译词
 */
const axios = require('axios');
const gulp = require('gulp');
const through2 = require('through2');
const fs = require('fs');
const { join, resolve } = require('path');
const config = require('./config');

const isFilePath = path => {
  try {
    fs.statSync(path);

    return true;
  } catch (err) {
    return false;
  }
};

const getReportWorld = () => {
  const LogFileNameFirst = 'upload-log';
  const ReportVersionReg = /report-\d+-\d+/;
  const LogFileName = `${LogFileNameFirst}-${config.env}.json`;
  const LogFilePath = join(config.langPath, LogFileName);

  if (!isFilePath(LogFilePath)) {
    fs.writeFileSync(LogFilePath, JSON.stringify({}));
  }

  const LogJson = require(LogFilePath);
  const devLocales = fs.readdirSync(config.langPath).filter(path => path.match(ReportVersionReg));

  const reportWorld = {};

  // 获取最近一次 report 的词库，上报
  const waitReport = devLocales.slice().pop() || '';

  const json = require(join(config.langPath, waitReport));

  for (const key of Object.keys(json)) {
    reportWorld[key] = json[key];
  }

  LogJson[waitReport] = true;

  // for (const path of devLocales) {
  //   const isChecked = LogJson[path];

  //   return;
  //   // 如果没有上传
  //   if (!isChecked) {
  //     const json = require(join(config.langPath, path));

  //     for (const key of Object.keys(json)) {
  //       reportWorld[key] = json[key];
  //     }

  //     LogJson[path] = true;
  //   }
  // }

  // 写入上报记录日志文件
  // fs.writeFileSync(LogFilePath, JSON.stringify(LogJson, null, 2));

  return reportWorld;
};

const lang = getReportWorld();

const worldKeys = [];
const fixCode = process.argv.slice(3)[0] === 'fix';

const extractWorld = (content, filePath) => {
  const worldKey = {};
  const key = Object.keys(config.pathsConfig)
    .sort((a, b) => b.length - a.length)
    .find(key => filePath.includes(key));
  const pageName = (key || config.itemOptions.link)
    .replace(/^\/|\/$/g, '')
    .replace(/\//g, '-')
    .trim();

  content = content.replace(/i18n.t\(['"]([\w\W]+?)['"](,?[\w\W]*?)\)/g, (all, applicationCode) => {
    let currentConfig = {};
    const value = lang[applicationCode];

    if (!value) {
      return all;
    }

    const codeAbbr = value
      .replace(/\{{2,}([\w\W]+)\}{2,}/, ($1, $2) => $2)
      .slice(0, 25)
      .replace(/ +/g, '-')
      .replace(/(['".。?？:*,，!！]|\d)/g, '')
      .trim();
    const newCode = fixCode ? `${pageName}-${codeAbbr}` : applicationCode;

    if (key) {
      currentConfig = {
        link: `${config.linkPrefix}${key}`,
        twoBusinessId: config.pathsConfig[key].twoBusinessId,
      };
    }

    worldKey[newCode] = {
      ...config.itemOptions,
      applicationCode: newCode,
      value,
      ...currentConfig,
    };

    return all.replace(applicationCode, newCode);
  });

  const worldKeys = Object.values(worldKey);

  if (fixCode) {
    fs.writeFileSync(filePath, content);
  }

  return worldKeys;
};

const run = () =>
  gulp.src(config.rootPaths.map(rootPath => `${rootPath}/**/*.?(js|jsx|tsx|ts)`)).pipe(
    through2.obj((file, _, cb) => {
      const content = file._contents.toString();

      worldKeys.push(...extractWorld(content, file.path));

      cb(null, file);
    })
  );

gulp.parallel([run])(() => {
  if (!worldKeys.length) {
    console.log('没有要上报的词');
    process.exit();
  }

  if (fixCode) {
    const newLang = {};

    for (const item of worldKeys) {
      newLang[item.applicationCode] = item.value;
    }

    fs.writeFileSync(config.langPath, JSON.stringify(newLang, null, 2));

    return;
  }

  // try {
  //   fs.writeFileSync(resolve('./a.txt'), JSON.stringify(worldKeys, null, 2));
  //   console.log('success');
  // } catch (error) {
  //   console.log('error: ', error);
  // }
  // return;

  axios
    .post(config.apiPrefix, {
      applicationId: config.applicationId,
      list: worldKeys,
    })
    .then(res => res.data)
    .then(res => {
      const failCodeList = (res.data && res.data.failCodeList) || [];

      console.log('successCount：', res.data.successCount);
      console.log('total：', res.data.total);

      if (failCodeList.length > 0) {
        console.log('上传失败的列表：', failCodeList);
        return;
      }

      console.log('isSuccess：', worldKeys.length === res.data.total);
    });
});
