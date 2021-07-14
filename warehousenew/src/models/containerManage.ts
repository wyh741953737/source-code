import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/containerManage';
import { message } from 'antd';

export default {
  namespace: 'containerManage',
  state: {
    ...formSearch.state,
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('containerManage', async searchParams => {
      const resp = await api.getList({
        data: {
          containerNum: searchParams.containerId,
          type: searchParams.containerType,
          status: searchParams.containerStatus,
          is_delete: searchParams.containerStop,
          storehouseId: searchParams.warehouse,
          updateBy: searchParams.updateBy,
          occupyFlag: searchParams.occupyFlag,
        },
        pageNum: searchParams.current,
        pageSize: searchParams.pageSize,
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
