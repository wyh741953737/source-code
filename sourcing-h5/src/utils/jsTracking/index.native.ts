import initTracking, {
  addTracking,
  emptyTracking,
} from '@cckj/react-native-tracking';
// import { addBehaviorApi, getConversationIdApi } from '../../services/point';

// 清空埋点缓存数据
// emptyTracking()
export default async () => {
  initTracking({
    // 每次调用addTracking方法时会触发此回调，支持返回一个处理后的data数据作为上报内容，不做处理则返回addTracking传递的数据
    async onAddTracking(data: any) {
      return {
        os: 'app',
        ...data
      };
    },
    // 每次调用addTracking、postTracking方法时会触发此回调，返回true表示可以删除已经上报过的数据列表
    onPostTracking(trackingList: any) {
      // console.log('埋点数据==》', trackingList)
      // return Promise.resolve(true);
      // if (trackingList.length <= 5) {
      //   return false;
      // }
      // return addBehaviorApi(trackingList)
      //   .then(() => true)
      //   .catch(() => false);
    },
  });
};

// 点击
export const elementClick = (data: any) => {
  addTracking({eventType: 1, ...data});
};

// 浏览
export const pageLoad = (data: any) => {
  addTracking({eventType: 2, ...data});
};
