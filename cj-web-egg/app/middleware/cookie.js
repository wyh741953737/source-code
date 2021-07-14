require('module-alias/register');
const { writeToLog } = require('../extend/application');
const { cookieParser } = require('@root/common/utils');

module.exports = function () {
  return async function (ctx, next) {
    const { config } = ctx.app;
    const language = ctx.cookies.get('language', { signed: false }) || config.language; // 默认英语
    const tmp = cookieParser(ctx.cookies.get('currency', { signed: false }));
    const currency = tmp ? tmp : config.currency; // 币种、汇率、符号
    ctx.cookies.language = language; // 挂载语言
    ctx.cookies.currency = currency; // 挂载币种

    await next();
  };
}