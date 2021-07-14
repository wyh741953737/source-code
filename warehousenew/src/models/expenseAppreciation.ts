import { formSearch } from '@/utils/stateUtil';
import * as api from '@/services/expenseAppreciation';
import { message } from 'antd';

export default {
  namespace: 'expenseAppreciation',
  state: {
    ...formSearch.state,
    searchData: {},
  },
  reducers: {
    ...formSearch.reducers,
  },
  effects: {
    ...formSearch.effects('expenseAppreciation', async searchParams => {
      // api.getList();
      return {
        current: 1,
        total: 100,
        dataSource: [
          { key: 1, number: 1111 },
          { key: 2, number: 22222 },
        ],
      };
    }),
  },
};
