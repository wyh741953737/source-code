import request from '@/utils/request';
import {
  GetList,
  GetHistory,
  GiveUp,
  Consumable,
  DoPackage,
  Print,
  SubmitAbnormal,
  PrintDetail,
  NoPack,
  UndoPackRecord,
  PrintList,
  EndCheckGoods,
  TransferExOrder,
  GetPODProductProperties,
} from './directSend.d';

import { reportLocalAudio } from '@/utils/report';

/**
 * 根据容器获取订单
 * @param data
 */
export async function getList(
  data: GetList.Request,
): Promise<GetList.ResponseTrans> {
  try {
    const response = await request.get<GetList.Response>(
      '/storehouse/storehouseBatchSortedRecord/getBatchSortedRecordsByDF',
      { params: data },
    );
    return response.data.map(d => {
      return {
        ...d,
        id: d.orderId,
        pendingVerify: d.uninspectedQuantity,
        processedVerify: d.goodQuantity,
        list: d.storehouseBatchSortedRecordDTOS.map(s => {
          return {
            ...s,
            sku: s.variantNum,
            pendingVerify: s.uninspectedQuantity,
            processedVerify: s.goodQuantity,
            batchMap: {},
          };
        }),
      };
    });
  } catch (error) {
    reportLocalAudio([error.message]);
    return Promise.reject();
  }
}

/**
 * 获取封箱记录
 * @param data
 */
export function getHistory(data: GetHistory.Request) {
  return request.get('/storehouse/storehousePack/getStorehousePackList', {
    params: data,
    noErrorMessage: true,
  });
}

/**
 * 撤销封箱
 * @param data
 */
export function giveUp(data: GiveUp.Request) {
  return request.get('/storehouse/storehousePack/deleteStorehousePack', {
    params: data,
  });
}

/**
 * 耗材录入
 * @param data
 */
export function consumable(data: Consumable.Request) {
  return request.post('/storehouse/storehousePack/upStorehousePack', data);
}

/**
 * 封箱
 * @param data
 */
export function doPackage(data: DoPackage.Request) {
  return request.post<string>(
    '/storehouse/storehousePack/saveStorehousePack',
    data,
  );
}

/**
 * 打印包裹码
 * @param data
 */
export function print(data: Print.Request) {
  return request.post('/storehouse/storehousePack/getPackCodeAddress', data);
}

/**
 * 批量打印面单-2,由于物流未对接，新增接口临时启用
 * @param data
 */
export function printListTwo(data: PrintList.Request) {
  return request.post<PrintList.Response>(
    '/storehouse/storehousePack/getNewSheetUrl',
    data,
  );
}

/**
 * 提交异常
 * @param data
 */
export function submitAbnormal(data: SubmitAbnormal.Request) {
  return request.post('/storehouse/storehouseStockEx/addStockoutEx', data);
}

/**
 * 打印装箱明细，返回pdf链接
 * @param data
 */
export function printDetail(data: PrintDetail.Request) {
  return request.post<PrintDetail.Response>(
    '/storehouse/storehousePack/getPackAddress',
    data,
  );
}

/**
 * 暂不打包
 * @param data
 */
export function noPack(data: NoPack.Request) {
  return request.post('/storehouse/storehousePack/noPack', data);
}

/**
 * 撤销打包记录
 * @param data
 */
export function undoPackRecord(data: UndoPackRecord.Request) {
  return request.post(
    '/storehouse/storehousePack/deleteStorehousePackByOrderIds',
    data,
  );
}
/**
 * 结束验货
 */
export function endCheckGoods(data: EndCheckGoods.Request) {
  return request.post('/storehouse/storehouseStockEx/endCheckOrder', data);
}

/**
 * 异常模板
 */
export function transferExOrder(data: TransferExOrder.Request) {
  return request.post('/storehouse/storehouseStockEx/transferExOrder', data);
}

/**
 * 查询定制化信息
 * @param data
 */
export function getPODProductProperties(data: GetPODProductProperties.Request) {
  return request.post<GetPODProductProperties.Response>(
    '/storehouse/storehouseReceiptPodOrder/getPODProductProperties',
    data,
  );
}
