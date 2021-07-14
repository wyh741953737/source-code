import * as api from '@/services/batchManage';
import { formSearch } from '@/utils/stateUtil';

export const namespace = 'batchManage';
export default {
  namespace,
  state: {
    ...formSearch.state,
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects(namespace, async searchParams => {
      const resp = await api.getList({
        pageSize: searchParams.pageSize,
        pageNum: searchParams.current,
        data: {
          orderType: searchParams.orderType,
          isCodePrint: searchParams.isCodePrint,
          storehouseId: searchParams.warehouse,
          id: searchParams.id,
          status: searchParams.status,
          claimTicketStatus: searchParams.claimTicketStatus,
          zhaoHuoRen: searchParams.zhaoHuoRen,
          waveId: searchParams.waveId,
          creater: searchParams.creater,
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
