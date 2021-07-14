import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/performanceList';
import { message } from 'antd';
import { PERFORMANCEGROUP } from '@/enum.config';
export const namespace = 'performanceList';
import storage from '@/utils/storage';
const performanceItem = storage.localGet('performanceItem');
export default {
  namespace: namespace,
  state: {
    ...formSearch.state,
    searchData: {
      ...formSearch.state.searchData,
      group: 1,
    },
    currentItem: performanceItem ? performanceItem : {},
  },
  reducers: {
    ...formSearch.reducers,
    _changecurrentItem(state: any, { payload }: any) {
      storage.localSet('performanceItem', JSON.stringify(payload.currentItem));
      return {
        ...state,
        currentItem: payload.currentItem,
      };
    },
  },
  effects: {
    ...formSearch.effects(namespace, async searchParams => {
      const { current, pageSize } = searchParams;
      const resp = await api.getList({
        startTime: searchParams.startTime,
        endTime: searchParams.endTime,
        storeId: searchParams.storeId,
        group: searchParams.group,
      });
      const groupVal: any = PERFORMANCEGROUP.key(Number(searchParams.group));
      const code: string = groupVal.code;
      const responseData: any = resp.data;
      const Data = responseData[code];
      Data.forEach((element: any) => {
        element['group'] = responseData.group;
      });
      return {
        current: 1,
        total: 1000000000000000,
        dataSource: Data,
        pageSize: 100000000000000,
      };
    }),
  },
};
