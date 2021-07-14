import { Paging } from './common.d';
export declare namespace GetList {
  export interface Request {
    /**
     * 物流追踪号
     */
    logisticsTrackingNumber?: string;
    /**
     * 入库编号
     */
    putStorageNumber?: string;
    /**
     * 订单号
     */
    orderNumber?: string;
    /**
     * 变体sku
     */
    sku?: string;
    /**
     * 提交人
     */
    submitterBy?: string;
    /**
     * 处理人
     */
    handlerBy?: string;
    /**
     * 异常状态：0：待处理、1：货已找到、2：确认少件
     */
    status?: number;
    /**
     * 0 ：签收少件，1：分标少件，2：质检少件，3：称重少件，4：上架少件
     */
    exceptionType?: number;
    /**
     * 单据号
     */
    documentNumber?: string;
    /**
     * 提交时间开始
     */
    startSubmitterDate?: number;
    /**
     * 提交时间结束
     */
    endSubmitterDate?: number;
    /**
     * 处理时间开始
     */
    startHandlerDate?: number;
    /**
     * 处理时间结束
     */
    endHandlerDate?: number;
    /**
     * 仓库id
     */
    storageId?: number;
    page: number;
    size: number;
  }
  export type Response = Paging;
}
export declare namespace Finded {
  export interface Request {
    /**
     * id
     */
    id: number;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 少件数量
     */
    quantity?: number;
  }
}
export declare namespace Lost {
  export interface Request {
    /**
     * id
     */
    id: number;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 少件数量
     */
    quantity: number;
  }
}
