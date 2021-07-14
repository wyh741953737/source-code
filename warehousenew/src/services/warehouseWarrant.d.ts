import { Paging } from './common.d';

export declare namespace GetList {
  interface Data {
    /**
     * 入库单号
     */
    putStorageNumber?: string;
    /**
     * 采购人
     */
    purchaser?: string;
    /**
     * 采购订单号
     */
    orderNumber?: string;
    /**
     * 入库类型(1：采购入库，2：调货入库，3：客户退回入库，4：货代退回入库，5：服务商品入库，6：供应商商品入库)
     */
    type?: number;
    /**
     * 物流单号（多个使用用";"分割）
     */
    logisticsTrackingNumbers?: string;

    // 入库状态
    status: number;
  }
  export interface Request {
    pageNum: number;
    pageSize: number;
    beginDate?: string;
    endDate?: string;
    data: Data;
  }
  export type Response = Paging;
}
export declare namespace DeleteRecord {
  export interface Request {
    /**
     * 入库单ID集合
     */
    ids: Array<number>;
  }
}

export declare namespace AddRecord {
  export interface Request {
    /**
     * 类型（1：采购入库，2：调货入库，3：客户退回入库，4：货代退回入库，5：服务商品入库，6：供应商商品入库）
     */
    type: number;
    /**
     * 仓库名称
     */
    storageName: string;
    /**
     * 仓库ID
     */
    storageId: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 物流追踪号（多个用";"隔开）
     */
    logisticsTrackingNumbers: string;
  }
}

export declare namespace ManuallyImport {
  export interface Request {
    /**
     * 类型（1：采购入库，2：调货入库，3：客户退回入库，4：货代退回入库，5：服务商品入库，6：供应商商品入库）
     */
    type: number;
    /**
     * 仓库名称
     */
    storageName: string;
    /**
     * 仓库ID
     */
    storageId: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 物流追踪号（多个用";"隔开）
     */
    logisticsTrackingNumbers: string;

    inboundBatch: string;

    /**
     * 商品明细
     */
    commodityDetailsList: Array<{
      sku: string;
      quantity: number;
    }>;
  }
  export type Response = {
    resultList: Array<{
      sku: string;
      quantity: number;
    }>;
    successQuantity: number;
    errorQuantity: number;
  };
}
export declare namespace UpdateRecord {
  interface LogisticsInfoDTOS {
    /**
     * 物流追踪号
     */
    logisticsTrackingNumber: string;
    /**
     * 物流公司
     */
    logisticsCompany: string;
  }
  export interface Request {
    /**
     * 入口单ID
     */
    id: string;
    /**
     * 入库单状态
     */
    status: string;
    /**
     * 物流追踪信息集合（新增）
     */
    logisticsInfoDTOS: LogisticsInfoDTOS;
  }
}
export declare namespace GetDetail {
  interface Data {
    /**
     * 入库单ID
     */
    putStorageNumberId: string;
  }
  export interface Request {
    pageNum: number;
    pageSize: number;
    data: Data;
  }
  export type Response = Paging;
}
export declare namespace GetDetailInfo {
  export interface Request {
    id: string;
  }
}
export declare namespace GetLogs {
  export interface Request {}
  export interface Response {}
}
