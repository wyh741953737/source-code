import { Paging, PagingRequest } from './common.d';
export declare namespace GetList {
  export type Request = PagingRequest<{
    /**
     * 仓库id
     */
    storehouseId?: string;
    /**
     * 包裹编号
     */
    packCode?: string;
    /**
     * 订单编号
     */
    orderId?: string;
    /**
     * 客户名
     */
    customerName?: string;
    /**
     * 面单状态：0 生成成功 1生成失败
     */
    sheetStatus?: number;
  }>;
  export type Response = Paging;
}
export declare namespace Feed {
  export interface Request {}
}
export declare namespace Print {
  export interface Request {
    ids: Array<number>;
  }
  export type Response = Array<string>;
}
export declare namespace ReCreate {
  export interface Request {}
}

// 手动填写运单号
export declare namespace FilloutTrackNumber {
  export interface Request {
    packCode: string; //包裹编号
    trackingNumber: string; //运单号
    offlineLogistics?: string; //线下物流单号
  }
  export type Response = boolean;
}
