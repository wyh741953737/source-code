import { Paging, PagingRequest } from './common.d';

//获取面单补打列表
export declare namespace GetList {
  export type Request = {
    /**
     * 追踪号
     */
    logisticsTrackingNumbers: Array<string>;
  };
  interface ResponseData {
    /**
     * 出库单id
     */
    id: number;

    /**
     * 出库单号
     */
    outboundOrder: string;

    /**
     * 订单号 待发单或者直发单号
     */
    orderId: string;

    /**
     * 母订单号
     */
    shipmentsOrderId: string;

    /**
     * 出库单类型 1 客户订单代发单 2 客户直发单 3 调度任务 4 退供 5 cj领料
     */
    type: number;

    /**
     * 订单金额
     */
    orderAmount: number;

    /**
     * 物流费用
     */
    logisticsCost: number;

    /**
     * 物流名称
     */
    logisticsCompany: string;

    /**
     * 物流追踪号
     */
    logisticsTrackingNumber: string;

    /**
     * 收件人
     */
    consignee: string;

    /**
     * 客户名称
     */
    customerName: string;

    /**
     * 客户订单号
     */
    clientOrderId: string;

    /**
     * 物流渠道
     */
    logisticsChannel: string;

    /**
     * 数量
     */
    quantity: string;

    /**
     * 重量
     */
    weight: string;
  }
  export type Response = Array<ResponseData>;
}

export declare namespace PagePrint {
  export type Request = {
    /**
     * 追踪号
     */
    trackingNumber: string;
  };

  export type Response = boolean;
}
