import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/exceptionRecords';
import { message } from 'antd';

export const namespace = 'exceptionRecords';
export default {
  namespace,
  state: {
    ...formSearch.state,
    searchData: { selectedOption: 0 },
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects(namespace, async searchParams => {
      const [startSubmitterDate, endSubmitterDate] =
        searchParams?.submitterDate || [];
      const [startHandlerDate, endHandlerDate] =
        searchParams?.handlerDate || [];
      const resp = await api.getList({
        logisticsTrackingNumber: searchParams.logisticsTrackingNumber,
        putStorageNumber: searchParams.putStorageNumber,
        orderNumber: searchParams.orderNumber,
        sku: searchParams.sku,
        submitterBy: searchParams.submitterBy,
        handlerBy: searchParams.handlerBy,
        status: searchParams.status,
        exceptionType: searchParams.exceptionType,
        documentNumber: searchParams.documentNumber,
        startSubmitterDate: startSubmitterDate?.valueOf(),
        endSubmitterDate: endSubmitterDate?.valueOf(),
        startHandlerDate: startHandlerDate?.valueOf(),
        endHandlerDate: endHandlerDate?.valueOf(),
        storageId: searchParams.storage,
        page: searchParams.current,
        size: searchParams.pageSize,
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
