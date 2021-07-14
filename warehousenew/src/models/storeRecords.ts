import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/storeRecords';
import { message } from 'antd';

export default {
  namespace: 'storeRecords',
  state: {
    ...formSearch.state,
    searchData: {},
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('storeRecords', async searchParams => {
      const resp = await api.getList({
        data: {
          sku: searchParams.sku,
          shortCode: searchParams.shortCode,
          storehouseId: searchParams.warehouse,
          customerName: searchParams.shipperName,
          containerNum: searchParams.containerName,
          batchNumber: searchParams.groupId,
          areaName: searchParams.warehouseArea,
          type: searchParams.storeType,
          documentNumber: searchParams.fromRecord,
          putStorageNumber: searchParams.businessRecord,
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
