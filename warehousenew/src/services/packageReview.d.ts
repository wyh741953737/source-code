import { Paging, PagingRequest } from './common.d';

export declare namespace GetList {
  export interface Request {
    /**
     * 容器编号
     */
    sortedContainer: string;
    /**
     * 是否代发，'0'直发，'1'代发
     */
    isDF: string;
    /**
     * 仓库id
     */
    storehouseId: string;
  }
  export type Response = Array<ResponseItem>;
  export interface ResponseItem {
    /**
     * 订单号
     */
    orderId: string;
    /**
     * 客户订单号
     */
    clientOrderId: string;
    /**
     * 客户名称
     */
    customerName: string;
    /**
     * 业务员
     */
    customerNameByYW: string;
    /**
     * 物流渠道
     */
    logisticsChannel: string;
    /**
     * 运单号
     */
    logisticsTrackingNumber: string;
    /**
     * 待验货数
     */
    uninspectedQuantity: number;
    /**
     * 已验货数
     */
    goodQuantity: number;
    storehouseBatchSortedRecordDTOS: Array<ResponseItemListItem>;

    // 单品多品类型 1:单品 2: 一单一品 3:多品
    commodityRules: number;

    /**是否异常 */
    isAbnormal: number;

    /**库位 */
    frameLocation: string;
  }
  export interface ResponseItemListItem {
    /**
     * 主键id
     */
    id: number;
    /**
     * 变体ID
     */
    variantId: string;
    /**
     * 变体sku
     */
    variantSku: string;
    /**
     * 变体短码
     */
    variantNum: string;
    /**
     * 变体图片
     */
    variantImg: string;
    /**
     * 拣货数量(已拣量)
     */
    processedQuantity: number;
    /**
     * 拣货容器
     */
    pickingContainer: string;
    /**
     * 拣货批次
     */
    batchId: string;
    /**
     * 拣货人id
     */
    pickingUserId: string;
    /**
     * 拣货人名称
     */
    pickingUserName: string;
    /**
     * 分拣数量(待验数量)
     */
    sortedQuantity: number;
    /**
     * 分拣容器
     */
    sortedContainer: string;
    /**
     * 订单号
     */
    orderId: string;
    /**
     * 分拣人id
     */
    sortedUserId: string;
    /**
     * 分拣人名称
     */
    sortedUserName: string;
    /**
     * 分拣时间
     */
    sortedAt: string;
    /**
     * 仓库ID
     */
    storehouseId: string;
    /**
     * 仓库名称
     */
    storehouseName: string;
    /**
     * 验货状态：0：待验货，1：已验货，2：缺货，3：面单异常
     */
    inspectionStatus: number;
    /**
     * 框号
     */
    frameLocation: number;
    /**
     * 已验货数量
     */
    goodQuantity: number;
    /**
     * 出库单详情id
     */
    outboundOrderDetailId: number;
    /**
     * 待验货数量
     */
    uninspectedQuantity: number;
    /**
     * 出库数量
     */
    outputQuantity: number;
    /**
     * 暂存容器
     */
    temporaryStorageContainer: string;
    /**
     * 商品类型
     */
    productType: string;
    /**
     * 代发单包装商品
     */
    batchSortedRecordByBZDTOS: Array<BatchSortedRecordByBZDTOS>;
    specifiedPackageList: Array<SpecifiedPackageList>;
  }
  interface BatchSortedRecordByBZDTOS {
    /**
     * 主键id
     */
    id: number;
    /**
     * 变体ID
     */
    variantId: string;
    /**
     * 变体sku
     */
    variantSku: string;
    /**
     * 变体短码
     */
    variantNum: string;
    /**
     * 变体图片
     */
    variantImg: string;
    /**
     * 拣货数量(已拣量)
     */
    processedQuantity: number;
    /**
     * 拣货容器
     */
    pickingContainer: string;
    /**
     * 拣货批次
     */
    batchId: string;
    /**
     * 拣货人id
     */
    pickingUserId: string;
    /**
     * 拣货人名称
     */
    pickingUserName: string;
    /**
     * 分拣数量
     */
    sortedQuantity: number;
    /**
     * 分拣容器
     */
    sortedContainer: string;
    /**
     * 订单号
     */
    orderId: string;
    /**
     * 分拣人id
     */
    sortedUserId: string;
    /**
     * 分拣人名称
     */
    sortedUserName: string;
    /**
     * 分拣时间
     */
    sortedAt: string;
    /**
     * 仓库ID
     */
    storehouseId: string;
    /**
     * 仓库名称
     */
    storehouseName: string;
    /**
     * 验货状态：0：待验货，1：已验货，2：缺货，3：面单异常
     */
    inspectionStatus: number;
    /**
     * 框号
     */
    frameLocation: number;
    /**
     * 已验货数量
     */
    goodQuantity: number;
    /**
     * 出库单详情id
     */
    outboundOrderDetailId: number;
    /**
     * 待验货数量
     */
    uninspectedQuantity: number;
    /**
     * 出库数量
     */
    outputQuantity: number;
    /**
     * 暂存容器
     */
    temporaryStorageContainer: string;
    /**
     * 追踪号
     */
    trackingNumber: string;
    /**
     * 商品名称
     */
    productName: string;
    /**
     * 商品类型
     */
    productType: string;
    /**
     * 属性
     */
    property: string;
    /**
     * 备注
     */
    remarks: string;

    locationList: Array<{
      locationId: string;
      locationName: string;
    }>;
  }
  interface SpecifiedPackageList {
    /**
     * 图片名称，是个string数组
     */
    imgs: string;
    /**
     * 订单号和外面一致
     */
    orderId: string;
    /**
     * 包装名称，string数组
     */
    pack: string;
    /**
     * 描述
     */
    remark: string;
    /**
     * 未知，暂时没用
     */
    stanProductId: string;
  }
  export type ResponseTrans = Array<Record>;
  export interface Record extends ResponseItem {
    id: string;
    /**
     * 待验数量
     */
    pendingVerify: number;
    /**
     * 已验数量
     */
    processedVerify: number;
    list: Array<ListItem>;
  }
  export interface ListItem extends ResponseItemListItem {
    sku: string;
    /**
     * 待验数量
     */
    pendingVerify: number;
    /**
     * 已验数量
     */
    processedVerify: number;
    [n: string]: any;
  }
  export interface BatchMap {
    [id: string]: number;
  }
}

export declare namespace ReinspectionOrder {
  export type Reqeust = {
    storehouseId: string;
    orderId: string;
  };

  export type Response = boolean;
}
