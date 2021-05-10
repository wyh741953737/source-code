import JsTracking from 'js-tracking-report';
import { getTokenStorage } from '@/utils/storage';
// import { getConversationIdApi, addBehaviorApi } from '@/services/point';

let timer: any;
/** 定时上报的时间间隔 */
const POST_DATA_TIME = 5000;

export default async () => {
  const jsTracking = JsTracking({
    processData: async (
      data,
      { eventType, dataIndex, eventDateTime, firstDateTime },
    ) => {
      const eventTypeData = {
        pageLoad: () => ({
          referrer: data.page.referrer,
          referrerHost: data.page.referrerHost,
          eventType: 2,
        }),
        elementClick: () => ({
          eventType: 1,
        }),
        elementView: () => ({
          eventType: 0,
        }),
      };

      const globalData = {
        token: getTokenStorage(),
      };

      const typeData = eventTypeData[eventType]();

      const { pageId, eventId, ...extInfoJson } = data.attrData;

      return {
        ...globalData,
        ...typeData,
        pageId,
        eventId,
        extInfoJson: JSON.stringify(extInfoJson),
      };
    },
    elementViewConditions: (element: HTMLElement) => {
      const { innerHeight } = window;
      const { y } = element.getBoundingClientRect();
      const height = (element.getBoundingClientRect().height / 3) * 2;

      return innerHeight - y >= height;
    },
    submitConditions: (dataList: any[]) => dataList.length >= 5,
    submitData: (dataList: any[]) => {
      console.log('埋点的数据', dataList);
      return Promise.resolve(true);
      // addBehaviorApi(dataList).then(res => res.success)
    },
  });

  /** 如果有埋点数据，定时上报 */
  if (!timer) {
    timer = setInterval(() => {
      const data = jsTracking.getDataList();
      // 如果有数据
      if (data.length > 0) {
        jsTracking.submitData();
      }
    }, POST_DATA_TIME);
  }

  // 防止用户不再访问网站导致数据丢失
  window.addEventListener('unload', () => {
    jsTracking.submitData();
    if (timer) {
      clearInterval(timer);
    }
  });
};
