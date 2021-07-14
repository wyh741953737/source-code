import { Paging, PagingRequest } from './common.d';

//获取包裹打印列表
export declare namespace GetList {
  interface Data {
    /**打印人 */
    printBy: string;
    /**仓库id */
    storageId: string;
    trackingNumber: string;
  }
  export type Request = {
    data: Data;
    pageNum: number;
    pageSize: number;
    beginDate: string;
    endDate: string;
  };
  export type Response = Paging<{
    /**
     * 出库称重包裹id
     */
    id: number;

    /**
     * 包裹编号
     */
    packageNumber: string;

    /**
     * 订单id
     */
    orderId: string;

    /**
     * 出库单号
     */
    outboundOrder: string;

    /**
     * 仓库id
     */
    storageId: string;

    /**
     * 仓库名称
     */
    storageName: string;

    /**
     * 物流渠道
     */
    logisticsChannel: string;

    /**
     * 物流名字
     */
    logisticsCompany: string;

    /**
     * 包裹数量
     */
    packageQuantity: number;

    /**
     * 电子秤型号
     */
    electronicScaleModel: string;

    /**
     * 净重(KG)
     */
    netWeight: number;

    /**
     * 毛重(KG)
     */
    grossWeight: number;

    /**
     * 打印时间
     */
    printAt: string;

    /**
     * 打印人
     */
    printBy: string;

    /**
     * 创建人
     */
    createBy: string;

    /**
     * 创建时间
     */
    createAt: string;

    /**
     * 0 操作中、1 已暂停、2 已完成、3 已揽收
     */
    status: string;

    /**
     * 揽件记录id
     */
    receiveId: number;

    /**
     * 0 待上网  1 已上网
     */
    onlineStatus: number;
  }>;
}

// 更新包裹打印毛重数据
export declare namespace UpdatePackageGrossWeight {
  export type Request = {
    /**
     * 包裹id
     */
    id: number;
    /**
     * 毛重（KG）
     */
    grossWeight: number;
  };

  export type Response = boolean;
}

// 更新包裹打印状态-暂停启用
export declare namespace UpdatePackageStatus {
  export type Request = {
    /**
     * 包裹id
     */
    id: number;
    /**
     * 包裹状态
     */
    status: number;

    /**
     * 电子秤型号
     */
    electronicScaleModel: string;
  };

  export type Response = boolean;
}

//新增包裹
export declare namespace AddNewPackage {
  export type Request = {
    /**
     * 物流名字
     */
    logisticsCompany: string;

    /**
     * 物流追踪号
     */
    logisticsTrackingNumber: string;

    /**
     * 包裹出库称重重量
     */
    weight: number;

    /**
     * 称重包裹id
     */
    weightPackageId: number;
  };

  export type Response = boolean;
}

//验证包裹追踪号
export declare namespace TrackNumber {
  export type Request = {
    /**
     * 物流名字
     */
    logisticsCompany: string;

    /**
     * 物流追踪号
     */
    logisticsTrackingNumber: string;

    /**
     * 称重包裹id
     */
    weightPackageId: number;
  };

  export type Response = boolean;
}

export declare namespace GetLogList {
  export type Request = {
    // 订单号
    id: string;
  };

  interface Data {
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
  }
  export type Response = Array<Data>;
}

// 包裹打印
// 更新包裹打印状态-暂停启用
export declare namespace PrintPackageNumber {
  export type Request = {
    /**
     * 包裹id
     */
    id: number;
    /**
     * 毛重
     */
    grossWeight: string;
  };

  export type Response = boolean;
}

/**
 * 包裹明细
 */
export declare namespace GetPackageInfo {
  export type Request = {
    /**
     * 包裹编号
     */
    packNumber: string;
  };

  export type Response = Array<{
    createAt: string;
    createBy: string;
    id: string;
    orderId: string;
    packCode: string;
    trackingNumber: string;
  }>;
}
