import request from '@/utils/request';
import {
  GetList,
  AddScheduling,
  EditSheduling,
  PrintPackageNumber,
  ConfirmGoodsDelivery,
  CheckPackageDetail,
  ExportExcel,
  CheckPackageLog,
  DeletePackage,
  InterceptPackage,
  HaveSignedPackage,
  SignFor,
  DeleteDispatcher,
  ConfirmReceiveGoods,
} from './orderDispatch.d';
/**
 * 获取调度任务列表
 * @param data
 */
export function getList(data: GetList.Request) {
  return request.post<GetList.Response>(
    '/storehouse-sign-web/scheduling/selectSchedulingPage',
    data,
  );
}

// 添加调度任务
export function addScheduling(data: AddScheduling.Request) {
  return request.post<AddScheduling.Response>(
    '/storehouse-sign-web/scheduling/saveScheduling',
    data,
  );
}

// 编辑调度任务
export function editSheduling(data: EditSheduling.Request) {
  return request.post<EditSheduling.Response>(
    '/storehouse-sign-web/scheduling/updateScheduling',
    data,
  );
}

//打印包裹编号
export function printPackageNumber(data: PrintPackageNumber.Request) {
  return request.post<PrintPackageNumber.Response>(
    '/storehouse-sign-web/scheduling/printPackageNumber',
    data,
  );
}

//确认收发货-调度任务
export function confirmGoodsDelivery(data: ConfirmGoodsDelivery.Request) {
  return request.post<ConfirmGoodsDelivery.Response>(
    '/storehouse-sign-web/scheduling/updateSchedulingStatus',
    data,
  );
}

//确认发货-包裹的
export function confirmReceiveGoods(data: ConfirmReceiveGoods.Request) {
  return request.post<ConfirmReceiveGoods.Response>(
    '/storehouse-sign-web/scheduling/schedulingPackageConfirmDelivery',
    data,
  );
}

//   查看包裹详情
export function checkPackageDetail(data: CheckPackageDetail.Request) {
  return request.post<CheckPackageDetail.Response>(
    '/storehouse-sign-web/scheduling/getSchedulingPackageDetailById',
    data,
  );
}

// 导出
export function exportExcel(data: ExportExcel.Request) {
  return request.post('/storehouse-sign-web/scheduling/exportList', data, {
    responseType: 'blob',
  });
}

//   查看包裹日志
export function checkPackageLog(data: CheckPackageLog.Request) {
  return request.post<CheckPackageLog.Response>(
    '/storehouse-sign-web/scheduling/getSchedulingLogList',
    data,
  );
}
//   删除包裹
export function deletePackage(data: DeletePackage.Request) {
  return request.post<DeletePackage.Response>(
    '/storehouse-sign-web/scheduling/deletePackage',
    data,
  );
}

//拦截包裹
export function interceptPackage(data: InterceptPackage.Request) {
  return request.post<InterceptPackage.Response>(
    '/storehouse-sign-web/scheduling/interceptPackage',
    data,
  );
}

// 已签收包裹列表

export function haveSignedPackage(data: HaveSignedPackage.Request) {
  return request.post<HaveSignedPackage.Response>(
    '/storehouse-sign-web/scheduling/signedPackagesList',
    data,
  );
}

// 签收
export function signFor(data: SignFor.Request) {
  return request.post<SignFor.Response>(
    '/storehouse-sign-web/scheduling/signFor',
    data,
  );
}

// 删除调度任务
export function deleteDispatcher(data: DeleteDispatcher.Request) {
  return request.post<DeleteDispatcher.Response>(
    '/storehouse-sign-web/scheduling/deleteScheduling',
    data,
  );
}
