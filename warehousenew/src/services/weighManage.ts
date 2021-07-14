import request from '@/utils/request';

import {
  GetList,
  GetWeightDetails,
  WeightMakeup,
  WeightConfirm,
  AddException,
  ScanContainer,
  UpRealityWeight,
  PrintBatchNumber,
} from './weighManage.d';

/** 获取称重管理列表 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    `/storehouse/weigh/getInspectWeighPage`,
    data,
  );
}

export function getDetail(data: GetWeightDetails.Request) {
  return request.post<GetWeightDetails.Response>(
    `/storehouse/weigh/getWeighDetails`,
    data,
  );
}

/**称重补打  */
export function weightMakeup(data: WeightMakeup.Request) {
  return request.post<WeightMakeup.Response>(`/storehouse/weigh/makeUp`, data);
}

/**称重确认  */
export function weightConfirm(data: WeightConfirm.Request) {
  return request.post<WeightConfirm.Response>(
    `/storehouse/weigh/updateWeighConfirm`,
    data,
  );
}

/**称重异常新增  */
export function addException(data: AddException.Request) {
  return request.post<AddException.Response>(
    `/storehouse/weigh/addException`,
    data,
  );
}

/**称重扫描  */
export function scanContainer(data: ScanContainer.Request) {
  return request.post<ScanContainer.Response>(
    `/storehouse/container/scanContainer`,
    data,
  );
}

/**称重修改重量  */
export function upRealityWeight(data: UpRealityWeight.Request) {
  return request.post<UpRealityWeight.Response>(
    `/storehouse//weigh/upRealityWeight`,
    data,
  );
}

/**打印批次号  */
export function printBatchNumber(data: PrintBatchNumber.Request) {
  return request.post<PrintBatchNumber.Response>(
    `/storehouse/weigh/printBatchNumber`,
    data,
  );
}
