import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/exceptionPurchase';
import { message } from 'antd';
import moment from 'moment';
import { EXCEPTIONWAREHOUSEOPTIONS } from '@/enum.config';

const defaultValue = {
  selectedOption: 1,
  timeRange: [moment().add(-30, 'days'), moment()],
};
export default {
  namespace: 'exceptionPurchaseProcessed',
  state: {
    ...formSearch.state,
    searchData: defaultValue,
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects(
      'exceptionPurchaseProcessed',
      async searchParams => {
        const getValue = (
          name: 'exceptionNum' | 'logisticsTrackingNumber' | 'batchNumber',
        ) => {
          return searchParams.selectedOption ===
            EXCEPTIONWAREHOUSEOPTIONS[name].key
            ? searchParams.searchText
            : undefined;
        };
        const [start, end] = searchParams.timeRange || [];
        const resp = await api.getList({
          status: 1002,
          page: searchParams.current,
          size: searchParams.pageSize,
          exceptionNum: getValue('exceptionNum'),
          logisticsTrackingNumber: getValue('logisticsTrackingNumber'),
          batchNumber: getValue('batchNumber')
            ? getValue('batchNumber').slice(-7)
            : undefined,
          startCreateDate: start?.valueOf(),
          endCreateDate: end?.valueOf(),
          exceptionSource: searchParams.receipts,
          type: searchParams.type,
          sku: searchParams.sku,
          shortNum: searchParams.shortNum,
          putStorageNumber: searchParams.enterNumber,
          createBy: searchParams.createPerson,
        });
        return {
          current: resp.data.pageNumber || searchParams.current,
          total: resp.data.totalRecords,
          dataSource: resp.data.content,
          pageSize: resp.data.pageSize || searchParams.pageSize,
        };
      },
      defaultValue,
    ),
  },
};
