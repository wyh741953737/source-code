import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/thirdStore';

export default {
  namespace: 'thirdStore',
  state: {
    ...formSearch.state,
    searchData: {},
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('thirdStore', async searchParams => {
      const resp = await api.getList({
        data: {
          sku: searchParams.sku,
          shortCode: searchParams.shortCode,
          storehouseId: searchParams.warehouse,
          customerId: searchParams.shipperId,
          customerName: searchParams.shipperName,
          containerNum: searchParams.containerName,
          type: searchParams.storeType,
          batchNumber: searchParams.groupId,
          field_4: searchParams.warehouseArea,
          productSku: searchParams.productSku,
        },
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
  },
};
