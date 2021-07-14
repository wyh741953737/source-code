import { Paging, PagingRequest } from './common.d';

//获取列表
export declare namespace GetList {
  export type Request = {
    /**
     * 仓库id
     */
    storageId?: string;

    /**
     * 出库类型 （0 销售出库 ，1 调用出库） */

    outboundType?: number;

    /**
     * 物流追踪号 */

    logisticsTrackingNumber?: string;

    /**
     * 出库单订单号 */

    orderId?: string;

    /**
     * 物流名字 */

    logisticsCompany?: string;

    /**
     * 称重时间 开始 */

    weighingTimeStart?: string;

    /**
     * 称重时间 结束 */

    weighingTimeEnd?: string;

    inspectionTimeStart?: string; //等待出库时间入参
    inspectionTimeEnd?: string; //等待出库时间入参

    /**物流账号 */
    companyAccount: string;
    /**
     * 0 待出库  1 已出库 2 称重异常 */

    status?: number;

    pageNum: number;

    pageSize: number;
  };
  export type Response = Paging<{
    /**
     * id
     */
    id: number;

    /**
     * 物流渠道 */

    logisticsChannel: string;

    /**
     * 物流名字 */

    logisticsCompany: string;

    /**
     * 物流追踪号 */

    logisticsTrackingNumber: string;

    /**
     * 出库单订单号 */

    orderId: string;

    /**
     * 0 待出库(待称重)  1 已出库（已称重） 2 称重异常	 */

    status: number;

    /**
     * 出库类型（0 销售出库 ，1 调用出库）
     */
    outboundType: number;

    /**
     * 包裹出库称重重量 */

    weight: number;

    /**
     * 重量偏差 */

    weightDeviation: number;

    /**
     * 创建人 */

    createBy: string;

    /**
     * 创建时间 */

    createAt: string;

    /**
     * 修改人
     */
    updateBy: string;

    /**
     * 修新时间 */

    updateAt: string;

    /**
     * 逻辑删除标识（0：未删除，1：已删除）
     */
    isDelete: number;

    /**
     * 称重人 */

    weightBy: string;

    /**
     * 称重时间 */

    weightAt: string;

    /**
     * 0 电子秤称重  1 手动输入
     */
    weightType: number;

    /**
     * 仓库id */

    storageId: string;

    /**
     * 仓库名称 */

    storageName: string;

    /**
     * 异常原因 */

    exceptionRemark: string;

    /**
     * 出库单号 */

    outboundOrder: string;

    /**
     * 0 待上网  1 已上网	 */

    onlineStatus: number;

    /**
     * 称重包裹id
     */
    weightPackageId: number;

    /**
     * 揽收记录id */

    receiveRecordId: number;
    /**
     * 对应框位
     */
    frameLocation: number;
    /**
     * 耗材重量
     */
    consumablesQuantity: number;
  }>;
}

// 录入重量
export declare namespace InputWeight {
  interface RequestData {
    /**
     * 物流追踪号
     */
    logisticsTrackingNumber: string;

    /**
     * 订单重量
     */
    weight: number;

    /**
     * 订单号
     */
    orderId: string;
  }
  interface ResponseData {
    /**
     * id
     */
    id: number;

    /**
     * 物流渠道 */

    logisticsChannel: string;

    /**
     * 物流名字 */

    logisticsCompany: string;

    /**
     * 物流追踪号 */

    logisticsTrackingNumber: string;

    /**
     * 出库单订单号 */

    orderId: string;

    /**
     * 0 待出库(待称重)  1 已出库（已称重） 2 称重异常	 */

    status: number;

    /**
     * 出库类型（0 销售出库 ，1 调用出库）
     */
    outboundType: number;

    /**
     * 包裹出库称重重量 */

    weight: number;

    /**
     * 重量偏差 */

    weightDeviation: number;

    /**
     * 创建人 */

    createBy: string;

    /**
     * 创建时间 */

    createAt: string;

    /**
     * 修改人
     */
    updateBy: string;

    /**
     * 修新时间 */

    updateAt: string;

    /**
     * 逻辑删除标识（0：未删除，1：已删除）
     */
    isDelete: number;

    /**
     * 称重人 */

    weightBy: string;

    /**
     * 称重时间 */

    weightAt: string;

    /**
     * 0 电子秤称重  1 手动输入
     */
    weightType: number;

    /**
     * 仓库id */

    storageId: string;

    /**
     * 仓库名称 */

    storageName: string;

    /**
     * 异常原因 */

    exceptionRemark: string;

    /**
     * 出库单号 */

    outboundOrder: string;

    /**
     * 0 待上网  1 已上网	 */

    onlineStatus: number;

    /**
     * 称重包裹id
     */
    weightPackageId: number;

    /**
     * 揽收记录id */

    receiveRecordId: number;
    /**
     * 对应框位
     */
    frameLocation: number;
    /**
     * 耗材重量
     */
    consumablesQuantity: number;
  }

  export type Request = {
    data: Array<RequestData>;
  };

  export type Response = {
    list: Array<ResponseData>;
    msg: string;
  };
}

//强制出库
export declare namespace ForceOutbound {
  export type Request = Array<{
    logisticsTrackingNumber: string;
    orderId: string;
  }>;
  export type Response = boolean;
}

//导出清单
export declare namespace BatchExportExcel {
  export type Request = {
    /**
     * 仓库id
     */
    storageId: string;

    /**
     * 出库类型 （0 销售出库 ，1 调用出库） */

    outboundType: number;

    /**
     * 物流追踪号 */

    logisticsTrackingNumber: string;

    /**
     * 出库单订单号 */

    orderId: string;

    /**
     * 物流名字 */

    logisticsCompany: string;

    /**
     * 称重时间 开始 */

    weighingTimeStart: string;

    /**
     * 称重时间 结束 */

    weighingTimeEnd: string;

    /**
     * 0 待出库  1 已出库 2 称重异常 */

    status: number;

    pageNum: number;

    pageSize: number;

    /**
     * 选中id集合
     */
    ids: Array<string>;
  };

  export type Response = boolean;
}

// 线下称重列表
export declare namespace GetOfflineWeightList {
  export interface Request {
    /**
     * 运单号/包裹码
     */
    logisticsTrackingNumber: number;
  }

  export type Response = {
    list: Array<{
      logisticsTrackingNumber: string;
      outboundOrder: string;
      orderId: string;
      companyAccount: string;
    }>;
    msg: string;
  };
}
