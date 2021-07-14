import * as api from '@/services/tallyBatch';
import { formSearch } from '@/utils/stateUtil';
import { momentRangeSplit } from '@/utils';

export const namespace = 'tallyBatch';
export default {
  namespace,
  state: {
    ...formSearch.state,
    detail: [],
  },
  reducers: {
    ...formSearch.reducers,
    _changeDetail(state: any, { payload }: any) {
      return {
        ...state,
        detail: payload.data,
      };
    },
  },
  effects: {
    ...formSearch.effects(namespace, async searchParams => {
      const [beginDate, endDate] = momentRangeSplit(searchParams.createTime);
      const [secondBeginDate, secondEndDate] = momentRangeSplit(
        searchParams.updateTime,
      );
      const resp = await api.getList({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        beginDate,
        endDate,
        secondBeginDate,
        secondEndDate,
        data: {
          storehouseId: searchParams.storehouseId,
          status: searchParams.status,
          createBy: searchParams.createBy,
          updateBy: searchParams.updateBy,
          tallyNum: searchParams.tallyNum && searchParams.tallyNum.split(','),
          batchNum: searchParams.batchNum && searchParams.batchNum.split(','),
        },
      });
      return {
        current: resp.data.pageNumber || searchParams.current,
        total: resp.data.totalRecords,
        dataSource: resp.data.content,
        pageSize: resp.data.pageSize || searchParams.pageSize,
      };
    }),
    *detail({ payload }: any, { call, put, select }: any) {
      const resp = yield api.getDetail(payload);
      if (resp && resp.data) {
        yield put({
          type: '_changeDetail',
          payload: {
            data: resp.data,
          },
        });
      }
    },
  },
};
