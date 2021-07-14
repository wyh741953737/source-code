import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/putawayManage';
import { message } from 'antd';
import storage from '@/utils/storage';
const PUTAWAYITEM = storage.localGet('putawayItem');
export default {
  namespace: 'putawayManage',
  state: {
    ...formSearch.state,
    currentItem: PUTAWAYITEM ? PUTAWAYITEM : {},
  },
  reducers: {
    ...formSearch.reducers,
    _changecurrentItem(state: any, { payload }: any) {
      storage.localSet('putawayItem', JSON.stringify(payload.currentItem));
      return {
        ...state,
        currentItem: payload.currentItem,
      };
    },
  },
  effects: {
    ...formSearch.effects('putawayManage', async searchParams => {
      const resp = await api.getList({
        beginDate: searchParams.beginDate,
        endDate: searchParams.endDate,
        onShelfNum: searchParams.onShelfNum,
        storehouseId: searchParams.storehouseId,
        updateBy: searchParams.updateBy,
        createBy: searchParams.createBy,
        status: searchParams.status,
        containerNum: searchParams.containerNum,
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
      });
      return {
        current: resp.data.pageNumber || searchParams.current,
        total: resp.data.totalRecords,
        dataSource: resp.data.content,
        pageSize: resp.data.pageSize || searchParams.pageSize,
      };
    }),
    *saveCurrentItem({ payload }: any, { call, put, select }: any) {
      yield put({ type: '_changecurrentItem', payload });
    },
  },
};
