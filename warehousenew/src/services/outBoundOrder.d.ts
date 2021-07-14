import { Paging } from './common.d';
export declare namespace GetOrderList {
  interface Data {
    /**
     * 出库单号
     */
    outboundOrder?: string;
    /**
     * 仓库id
     */

    storageId?: string;
    /**
     * 订单号 待发单或者直发单号
     */

    orderId?: string;
    /**
     *  出库单状态 0 待配齐 1 已配齐 2 待拣货 3 拣货中 4 已验货 5 待称重 6 已出库 7 超时出库 8 异常订单 9 已结束
     */

    status: number;
    /**
     * 母订单号
     */
    shipmentsOrderId?: string;
    /**
     * 出库单类型 1 客户订单代发单 2 客户直发单 3 调度任务 4 退供 5 cj领料
     */

    type?: number;
    /**
     * 客户订单号
     */

    clientOrderId?: string;

    // 异常订单处理状态
    controlStatus: string;

    /**创建时间开始 */
    createStartTime: string;

    /**创建时间结束 */
    createEndTime: string;

    /**出库时间开始 */
    deliveryStartTime: string;

    /**出库时间结束 */
    deliveryEndTime: string;

    /**物流单号 */
    logisticsTrackingNumber: string;

    /**是否国内订单 */
    isCountry: string;

    /**异常状态类型 */
    exceptionStatus: string;

    productSku: string;
    variantSku: string;
    changeStartTime: string;
    changeEndTime: string;

    /**业务员群主 */
    salesmanName: string;

    completedStartTime: string;
    completedEndTime: string;

    /**客户名称 */
    customerName: string;
  }
  export interface Request {
    data: Data;
    pageNum: number;
    pageSize: number;
  }
  export type Response = Paging<{
    /**
     *  出库单id
     */
    id?: number;
    /**
     * 出库单号
     */
    outboundOrder?: string;
    /**仓库名称 */

    storageName?: string;

    /**订单号 待发单或者直发单号 */

    orderId?: string;

    /**出库单状态 0 待配齐 1 已配齐 2 待拣货 3 拣货中 4 已验货 5 待称重 6 已出库	 */

    status?: number;

    /**母订单号 */

    shipmentsOrderId?: string;

    /**出库单类型 1 客户订单代发单 2 客户直发单 3 调度任务 4 退供 5 cj领料	 */

    type?: number;

    /** 0 否不是首单 1 是首单	 */

    isFirstOrder?: number;

    /**子订单商品数量 */

    quantity?: number;

    /**订单金额 */

    orderAmount?: number;

    /**重量 */

    weight?: number;

    /**物流费用 */

    logisticsCost?: number;

    /**物流渠道 */

    logisticsCompany?: string;

    /**物流追踪号 */

    logisticsTrackingNumber?: string;

    /**收件人 */
    consignee?: string;

    /**仓库 0 义乌 1 深证 2 美东 3 美西 4 泰国 5 金华 6 印尼 7 法兰克福 */

    store?: number;

    /** 超时出库单 0 否 1 是 */
    timeOut?: number;

    /** 异常订单 0 否 1是 */
    exceptionOrder?: number;

    /**异常状态 1 面单过期、2 修改订单、3 客户纠纷、4 采购缺货、5 验单缺货、6 手动拦截	 */

    exceptionStatus: number;

    /**客户名称 */

    customerName?: string;

    /**创建人 */

    createBy?: string;

    /**创建时间 */

    createAt?: string;

    /** 1 待处理 2 可控 3 不可控 */
    controlStatus?: number;

    /**状态变更时间 */

    changeTime?: string;

    /**1 采购缺货 2采购缺货退款 3 纠纷退款 4 纠纷补发 5 验单缺货 */
    exceptionEndStatus?: number;

    /**商品规则：1.单品，2.一单一品，3.相同sku，4.多品', */

    commodityRules?: number;

    /**波次主键id */

    waveId?: number;

    /**批次id */

    batchId?: string;

    /**是否是pod订单 0 否 1是 */

    isPod?: number;

    /**客户订单号 */

    clientOrderId?: string;
  }>;
}

// 超时出库-异常订单处理
export declare namespace ExceptionProcess {
  export interface Request {
    /**
     * 出库单id
     */
    id: number;
    /**处理类型
     *  1 待处理 2 可控 3 不可控
     */
    controlStatus: number;
    /**
     * 备注
     */
    remarks: string;
    /**订单号 */
    orderId: string;
    /**出库单号 */
    outboundOrder: string;
  }
  export type Response = string;
}

// 出库单查询日志
export declare namespace GetLog {
  export interface Request {
    id: string;
  }
  export type Response = Paging<{
    /**
     *  id
     */
    id?: number;
    /**
     * 操作节点  1 生成入库单  2 生成波次 3 生成批次
     */
    operationNode?: string;
    /**操作内容 */

    operationContent?: string;

    /**操作时间 */

    operationTime?: string;

    /**出库单	 */

    outboundOrder?: number;

    /**订单号 */

    orderId?: string;
  }>;
}

// 出库单查询详情
export declare namespace GetDetail {
  interface Data {
    id: string;
  }
  export interface Request {
    data: Data;
    pageNum: number;

    pageSize: number;
  }
  export type Response = Paging<{
    /**商品图片*/
    image?: string;

    /**变体sku*/

    sku?: string;

    /**商品名称*/

    productName?: string;

    /**属性*/

    property?: string;

    /**重量*/

    weight?: number;

    /**预计到货数量*/

    quantity?: number;

    /**申报价值*/

    declaredValue?: number;

    /**原价*/

    originalPrice?: number;

    /**总价*/

    totalPrice?: number;

    /**折扣价*/

    discountPrice?: number;

    /**折后总价*/

    totalPriceAfterDiscount?: number;
  }>;
}

// 出库单详情-基础信息
export declare namespace GetBasicInfo {
  export interface Request {
    id: string;
  }

  interface responseData {
    /**出库单号 */
    outboundOrder: string;

    /**出库单状态 0 待配齐 1 已配齐 2 待拣货 3 拣货中 4 已验货 5 待称重 6 已出库	 */

    status: number;

    /**拣货批次 */
    batchId: string;

    /**运单号 */

    logisticsTrackingNumber: string;

    /**cj订单号 */

    orderId: string;

    /**客户订单号 */

    clientOrderId: string;

    /**母订单号 */

    shipmentsOrderId: string;

    /**出库单类型 1 客户订单代发单 2 客户直发单 3 调度任务 4 退供 5 cj领料 */

    type: number;

    /**仓库名称 */

    storageName: string;

    /**0 否不是首单 1 是首单 */

    isFirstOrder: number;

    /**订单金额 */

    orderAmount: number;

    /**物流费用 */

    logisticsCost: number;

    /**物流渠道 */

    logisticsCompany: string;

    /**收件人 */

    consignee: string;

    /**客户名称 */

    customerName: string;

    /**订单付款时间 */

    paymentAt: string;
    /**
     * 是否抵扣
     */
    isDeduction: number;
  }
  export type Response = responseData;
}

// 出库单详情-物流信息
export declare namespace GetLogisticsInfo {
  export interface Request {
    id: string;
  }

  interface responseData {
    /**客户姓名 */
    customerName?: string;

    /**邮寄地址 */

    shippingAddress?: string;

    /**店铺名称 */

    storeName?: string;

    /**物流名称 */

    logisticName?: string;

    /**追踪单号 */

    trackingnumber?: string;

    /**订单邮费 */

    postage?: number;

    /**订单总价 */

    amount?: number;

    /**订单商品总价 */

    orderAmount?: number;

    /**邮寄地址2 */

    shippingAddress2?: string;

    /**关联的业务员名字 */

    salesmanName?: string;

    /**客户的名字 */

    consumerName?: string;

    /**付款时间 */

    paymentDate?: string;

    /**仓库 */

    store: string;

    /**群主 */
    lord: string;
  }
  export type Response = responseData;
}

export declare namespace GetStatusCount {
  export interface Request {
    storageId: string;
  }
  interface Detail {
    /**全部 */
    all?: number;

    /**待配齐 */

    toBeCompleted?: number;

    /**已配齐 */

    completed?: number;

    /**待拣货 */

    toBePicked?: number;

    /**待分拣 */

    toBeSorted?: number;

    /**待验货 */

    pendingInspection?: number;

    /**待称重 */

    toBeWeighed?: number;

    /**已出库 */

    outOfStock?: number;

    /**超时出库单 */

    timeoutOutboundOrder?: number;

    /**异常订单 */

    abnormalOrder?: number;

    /**已结束 */

    over?: number;

    /**面单过期 */
    faceExpiredOrder?: number;

    /**验单缺货 */
    outOfStockInspection?: number;
  }

  export type Response = Array<Detail>;
}

// 抵扣库存
export declare namespace DeductionInventory {
  export type Request = {
    orderIdList: Array<string>;
  };

  export type Response = boolean;
}

// 释放库存
export declare namespace ReleaseInventory {
  export type Request = {
    orderIdList: Array<string>;
  };

  export type Response = boolean;
}

/**直发单导出 */
export declare namespace DirectExport {
  interface Data {
    /**
     * 出库单号
     */
    outboundOrder?: string;
    /**
     * 仓库id
     */

    storageId?: string;
    /**
     * 订单号 待发单或者直发单号
     */

    orderId?: string;
    /**
     *  出库单状态 0 待配齐 1 已配齐 2 待拣货 3 拣货中 4 已验货 5 待称重 6 已出库 7 超时出库 8 异常订单 9 已结束
     */

    status: number;
    /**
     * 母订单号
     */
    shipmentsOrderId?: string;
    /**
     * 出库单类型 1 客户订单代发单 2 客户直发单 3 调度任务 4 退供 5 cj领料
     */

    type?: number;
    /**
     * 客户订单号
     */

    clientOrderId?: string;

    // 异常订单处理状态
    controlStatus: string;

    /**创建时间开始 */
    createStartTime: string | undefined;

    /**创建时间结束 */
    createEndTime: string | undefined;

    /**出库时间开始 */
    deliveryStartTime: string | undefined;

    /**出库时间结束 */
    deliveryEndTime: string | undefined;

    /**物流单号 */
    logisticsTrackingNumber: string;

    /**是否国内订单 */
    isCountry: string;

    /**异常状态类型 */
    exceptionStatus: string;

    sku: string;
    changeStartTime: string | undefined;
    changeEndTime: string | undefined;

    /**业务员群主 */
    salesmanName: string;

    completedStartTime: string | undefined;
    completedEndTime: string | undefined;
  }
  export interface Request {
    data: Data;
    pageNum: number;
    pageSize: number;
  }
  export type Response = Blob;
}

export declare namespace SubmitToWeight {
  export type Request = {
    id: string;
  };

  export type Response = boolean;
}
