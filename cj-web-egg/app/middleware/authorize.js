
/**
 * 登陆鉴权
 * 暂时没法用 Cookie 的形式，因为要兼容之前的用js判断
 */
module.exports = () => {
  return async function (app, next) {

    await next();
  }
};