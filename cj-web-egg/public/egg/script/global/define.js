import { checkLogin, getUserInfo } from './utils';

/** 定义用户信息 */
export function defUserinfo(obj) {
  Object.defineProperty(obj, 'CJ_userInfo', {
    get() {
      return getUserInfo();
    },
    set() { }
  });
  
}

/** 登录校验 */
export function defIsLogin(obj) {
  Object.defineProperty(obj, 'CJ_isLogin', {
    get() {
      return checkLogin();
    },
    set() { }
  });
}
