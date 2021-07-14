import { PagingRequest, Paging } from './common.d';
export declare namespace GetList {
  export type Request = PagingRequest<{
    clientOrderId: string;
    orderId: string;
    logisticsTrackingNumber: string;
    sku: string;
    createBy: string;
    operatorName: string;
    storehouseId: string;
    status: string;
    stockoutTimeStart: string | undefined;
    stockoutTimeEnd: string | undefined;
    variantNum: string;
  }>;
  export type Response = Paging;
}
export declare namespace Finded {
  export interface Request {
    /**
     * 主键id
     */
    id: number;
    /**
     * 状态
     */
    status: number;
    /**
     * 仓库id
     */
    storehouseId: string;
  }
}
export declare namespace Lost {
  export interface Request {
    /**
     * 主键id
     */
    id: number;
    /**
     * 处理人
     */
    operatorName?: string;
    /**
     * 状态
     */
    status: number;
    /**
     * 备注
     */
    remarks?: string;
    /**
     * 缺货数量
     */
    stockQuantity: number;

    /**
     * 仓库id
     */
    storehouseId: string;
  }
}

//导出数据
export declare namespace ExportData {
  export type Request = {
    clientOrderId: string;
    orderId: string;
    logisticsTrackingNumber: string;
    sku: string;
    createBy: string;
    operatorName: string;
    storehouseId: string;
    status: string;
    stockoutTimeStart: string | undefined;
    stockoutTimeEnd: string | undefined;
    variantNum: string;
  };

  export type Response = Blob;
}
