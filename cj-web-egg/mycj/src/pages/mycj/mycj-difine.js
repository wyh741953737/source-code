import { base64, store } from '@src/utils';

/** 定义用户信息 */
export function defineUserinfo($rootScope) {
  Object.defineProperty($rootScope, 'userInfo', {
    get() {
      let userInfo = {
        userId: store.get('userId', { decode: true }),
        status: store.get('status') || undefined,
        vip: store.get('vip') || undefined,
        token: store.get('token'),
        avatar: store.get('avatar') || undefined
      };

      if (userInfo.userId) {
        const [
          name,
          loginName,
          salesmanId,
          relateSalesman,
          firstName,
          lastName,
          avatar
        ] = store.get([
          'name',
          'loginName',
          'salesmanId',
          'relateSalesman',
          'firstName',
          'lastName',
          'avatar'
        ], { decode: true });
        userInfo = {
          ...userInfo,
          name,
          loginName,
          salesmanId,
          relateSalesman,
          firstName,
          lastName,
          avatar
        };
      }

      return userInfo;
    },
    // 20-02-03 set 不写会报错
    // Cannot set property userInfo of #<m> which has only a getter
    set() { }
  });

}

/** 定义一些工具 */
export function defineUtils($rootScope) {
  $rootScope.base64 = base64;
  $rootScope.store = store;
}
