import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/exceptionWarehouse';
import { message } from 'antd';
import moment from 'moment';
import { EXCEPTIONWAREHOUSEOPTIONS } from '@/enum.config';

const defaultValue = {
  selectedOption: 3,
  timeRange: [moment().add(-30, 'days'), moment()],
};
export default {
  namespace: 'exceptionWarehouseDealing',
  state: {
    ...formSearch.state,
    searchData: defaultValue,
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects(
      'exceptionWarehouseDealing',
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
          pageNum: searchParams.current,
          pageSize: searchParams.pageSize,
          beginDate: start && start.format('YYYY-MM-DD'),
          endDate: end && end.format('YYYY-MM-DD'),
          data: {
            status: 1001,
            sku: searchParams.sku,
            shotNum: searchParams.shortNum,
            batchNumber: getValue('batchNumber')
              ? getValue('batchNumber').slice(-7)
              : undefined,
            exceptionNum: getValue('exceptionNum'),
            logisticsNumber: getValue('logisticsTrackingNumber'),
            putStorageNumber: searchParams.enterNumber,
            type: searchParams.type,
            createBy: searchParams.createPerson,
            storageId: searchParams.warehouse,
            exceptionSource: searchParams.receipts,
            orderNumber: searchParams.orderNumber,
          },
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
