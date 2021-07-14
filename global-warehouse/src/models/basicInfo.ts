import { storage, languages } from '@/utils/tools';

export default {
  namespace: 'basicInfo',
  state: {
    rate: 1, // 汇率
    language: storage.get('language') || 'en', // 语言
    languageOpt: storage.get('languageOpt') || 'en|en', // 语言
    currency: 'USD', // 货币
    symbol: '$', // 货币符号
    listProductCount: 0, // 刊登数量
    warehouse: '', // 仓库
    warehouseName: '', // 仓库名称
    needReload: false, // 页面是否需要重载
    googleToSix: false, // 谷歌翻译转6国翻译
  },
  effects: {
    *saveRate(action: any, { put }: any) {
      yield put({ type: 'doSaveRate', payload: action.payload });
    },
    *saveLan(action: any, { put, select }: any) {
      const oldLanguage: string = yield select(
        (state: any) => state.basicInfo.language,
      );
      const googleToSix =
        languages.includes(action?.payload?.language) &&
        !languages.includes(oldLanguage);

      console.log(
        oldLanguage,
        languages.includes(oldLanguage),
        action?.payload?.language,
        languages.includes(action?.payload?.language),
      );
      storage.set('language', action?.payload?.language);
      storage.set('languageOpt', action?.payload?.languageOpt);
      yield put({
        type: 'doSaveLan',
        payload: { ...action.payload, googleToSix },
      });
    },
    *saveListCount(action: any, { put }: any) {
      yield put({ type: 'doSaveListCount', payload: action.payload });
    },
    *saveWarehouse(action: any, { put }: any) {
      yield put({ type: 'doSaveWarehouse', payload: action.payload });
    },
  },
  reducers: {
    doSaveRate(state: any, action: any) {
      const { rate, currency, symbol } = action.payload;
      return { ...state, rate, currency, symbol };
    },
    doSaveLan(state: any, action: any) {
      const { language, languageOpt, googleToSix } = action.payload;
      return { ...state, language, languageOpt, needReload: true, googleToSix };
    },
    doSaveListCount(state: any, action: any) {
      const { listProductCount } = action.payload;
      return { ...state, listProductCount };
    },
    doSaveWarehouse(state: any, action: any) {
      const { warehouse, warehouseName } = action.payload;
      return { ...state, warehouse, warehouseName };
    },
  },
};
