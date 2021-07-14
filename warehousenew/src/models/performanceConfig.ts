import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/performanceConfig';
import { message } from 'antd';
import { PERFORMANCEGROUP } from '@/enum.config';
export const namespace = 'performanceConfig';
import storage from '@/utils/storage';
const performanceConfigItem = storage.localGet('performanceConfigItem');
export default {
  namespace: namespace,
  state: {
    ...formSearch.state,
    searchData: {
      ...formSearch.state.searchData,
      group: 1,
    },
    currentItem: performanceConfigItem ? performanceConfigItem : {},
  },
  reducers: {
    ...formSearch.reducers,
    _changecurrentItem(state: any, { payload }: any) {
      storage.localSet(
        'performanceConfigItem',
        JSON.stringify(payload.currentItem),
      );
      return {
        ...state,
        currentItem: payload.currentItem,
      };
    },
  },
  effects: {
    ...formSearch.effects(namespace, async searchParams => {
      const resp = await api.getList({
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
        total: 100,
        dataSource: Data,
      };
    }),
  },
};
