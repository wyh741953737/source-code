import * as api from '@/services/wavePickingManage';
import { formSearch } from '@/utils/stateUtil';

export const namespace = 'wavePickingManage';
export default {
  namespace,
  state: {
    ...formSearch.state,
    currentStore: '',
  },
  reducers: {
    ...formSearch.reducers,
    _saveStore(state: any, { payload }: any) {
      return {
        ...state,
        currentStore: payload.storehouseId,
      };
    },
  },
  effects: {
    ...formSearch.effects(namespace, async searchParams => {
      const resp = await api.getList({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        data: {
          storehouseId: searchParams.storehouseId,
          waveName: searchParams.waveName,
          id: searchParams.id,
          waveStatus: searchParams.waveStatus,
          waveType: searchParams.waveType,
        },
      });
      return {
        current: resp.data.pageNumber || searchParams.current,
        total: resp.data.totalRecords,
        dataSource: resp.data.content,
        pageSize: resp.data.pageSize || searchParams.pageSize,
      };
    }),
  },
};
