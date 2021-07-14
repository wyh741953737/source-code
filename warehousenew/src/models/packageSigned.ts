import { formSearch } from '@/utils/stateUtil';
import * as api_packageSign from '@/services/packageSign';
import * as common from '@/services/common';
import { message } from 'antd';

export default {
  namespace: 'packageSigned',
  state: {
    ...formSearch.state,
    logVisible: false,
    logInfo: [],
  },
  reducers: {
    ...formSearch.reducers,
    _logVisibleChange(
      state: any,
      { payload }: { payload: { visible: boolean; data?: object } },
    ) {
      return { ...state, logVisible: payload.visible, logInfo: payload.data };
    },
  },
  effects: {
    ...formSearch.effects('packageSigned', async searchParams => {
      const resp = await api_packageSign.getParcelList({
        putStorageNumber: searchParams.putStorageNumber,
        id: searchParams.id,
        createBy: searchParams.createBy,
        supplier: searchParams.supplier,
        logisticsTrackingNumber: searchParams.logisticsTrackingNumber,
        sku: searchParams.sku,
        startCreateDate: searchParams.startCreateDate,
        endCreateDate: searchParams.endCreateDate,
        signInType: searchParams.signInType,
        signInStatus: '1',
        size: searchParams.pageSize,
        page: searchParams.current,
        storageId: searchParams.storageId,
        batchNumber: searchParams.batchNumber,
        orderNumber: searchParams.orderNumber,
      });
      return {
        dataSource: resp.data.content,
        current: resp.data.pageNumber || searchParams.current,
        total: resp.data.totalRecords,
        pageSize: resp.data.pageSize || searchParams.pageSize,
      };
    }),
  },
};
