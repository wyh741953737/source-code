import throttle from './throttle';
interface formSearchState {
  searchData: object;
  pageSize: number;
  current: number;
  total: number;
  dataSource: Array<any>;
  loading: boolean;
}
interface Action {
  payload: formSearchState;
}

type Reducer = (state: formSearchState, action: Action) => formSearchState;

interface formSearchReducer {
  _searchDataChange: Reducer;
  _changePageSize: Reducer;
  _changeDataSource: Reducer;
  _changeLoadingStatus: Reducer;
}

interface SearchParams {
  current: number;
  pageSize: number;

  [name: string]: any;
}

export type SearchFun = (searchParams: SearchParams) => Promise<PromiseResult>;

export interface PromiseResult {
  current: number;
  total: number;
  dataSource: Array<any>;
}

type formSearchEffects = (
  namespace: string,
  searchFun: SearchFun,
  initialSearchData?: object,
) => {
  search: (
    {
      payload,
    }: {
      payload?: { searchData?: any; pageNumber?: number; pageSize: number };
    },
    { call, put, select }: { call: any; put: any; select: any },
  ) => void;
  searchDataClear: (
    { payload }: { payload: any },
    { call, put, select }: { call: any; put: any; select: any },
  ) => void;
  searchPageSizeChange: (
    { payload }: { payload: { pageSize: number } },
    { call, put, select }: { call: any; put: any; select: any },
  ) => void;
};

export const formSearch: {
  state: formSearchState;
  reducers: formSearchReducer;
  effects: formSearchEffects;
} = {
  state: {
    searchData: {},
    pageSize: 10,
    current: 1,
    total: 0,
    dataSource: [],
    loading: false,
  },
  reducers: {
    _searchDataChange(state, { payload }) {
      return { ...state, searchData: payload.searchData, current: 1 };
    },
    _changePageSize(state, { payload }) {
      return { ...state, pageSize: Number(payload.pageSize), current: 1 };
    },
    _changeLoadingStatus(state, { payload }) {
      return { ...state, loading: payload.loading };
    },
    _changeDataSource(state, { payload }) {
      return {
        ...state,
        current: Number(payload.current),
        total: Number(payload.total),
        dataSource: payload.dataSource,
        loading: false,
        pageSize: Number(payload.pageSize),
      };
    },
  },
  effects: (namespace, searchFun, initialSearchData = {}) => {
    return {
      /**
       * 搜索
       * @param payload
       * @param call
       * @param put
       * @param select
       */
      *search({ payload }, { call, put, select }) {
        const state = yield select((state: any) => state[namespace]);
        if (!state) return;
        // 获取搜索条件
        let { searchData, current, pageSize } = state;
        const newSearchData = { ...searchData, ...payload?.searchData };
        if (
          payload?.searchData &&
          Object.keys(payload.searchData).length !== 0
        ) {
          // 有变动就保存
          yield put({
            type: '_searchDataChange',
            payload: { searchData: newSearchData },
          });
          // 有变动就改为第一页
          current = 1;
        }
        yield put({
          type: '_changeLoadingStatus',
          payload: { loading: true },
        });
        try {
          const result = yield searchFun({
            ...newSearchData,
            current: payload?.pageNumber || current,
            pageSize: payload?.pageSize || pageSize,
          });
          yield put({ type: '_changeDataSource', payload: result });
        } catch (e) {
        } finally {
          yield put({
            type: '_changeLoadingStatus',
            payload: { loading: false },
          });
        }
      },
      /**
       * 清除搜索条件
       * @param payload
       * @param call
       * @param put
       * @param select
       */
      *searchDataClear({ payload }, { call, put, select }) {
        yield put({
          type: '_searchDataChange',
          payload: { searchData: { ...initialSearchData, ...payload } },
        });
        yield put({ type: 'search', payload: {} });
      },
      /**
       * 变更table的page大小，自带重新搜索
       * @param payload
       * @param call
       * @param put
       * @param select
       */
      *searchPageSizeChange({ payload }, { call, put, select }) {
        yield put({ type: '_changePageSize', payload });
      },
    };
  },
};
