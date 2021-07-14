import { Paging } from './common.d';

export declare namespace GetList {
  interface Data {
    /**
     * 0 -待处理 1-已放弃 2-已处理 3-已完成
     */
    status: number;
    /**
     * 异常单号
     */
    exceptionNum?: string;
    /**
     * 异常单据
     */
    exceptionSource?: number;
    /**
     * 异常类型：1：多货、2：少货、3：异常
     */
    type?: number;
    /**
     * sku
     */
    sku?: string;
    /**
     * 入库编号
     */
    putStorageNumber?: string;
    /**
     * 创建人
     */
    createBy?: string;
    /**
     * 物流追踪号
     */
    logisticsNumber?: string;
    /**
     * 批次号
     */
    batchNumber?: string;
    /**
     * 仓库id
     */
    storageId?: string;
    /**
     * 短码
     */
    shotNum?: string;
    /**
     * 采购单号
     */
    orderNumber: string;

    /**处理结果 */
    dealResult: number;
  }
  export interface Request {
    data?: Data;
    pageNum: number;
    pageSize: number;
    beginDate: string;
    endDate: string;
  }
  export type Response = Paging;
}

export declare namespace Add {
  export interface Request {
    /**
     * 图片
     */
    images: string;
    /**
     * 异常单号
     */
    receiptExceptionId: number;
    /**
     * 异常原因
     */
    exceptionCause: string;
    /**
     * 异常数量
     */
    quantity: number;
  }
}

export declare namespace Update {
  export interface Request {
    /**
     * 异常记录id
     */
    id: number;
    /**
     * 图片
     */
    images?: string;
    /**
     * 异常原因
     */
    exceptionCause?: string;
    /**
     * 异常数量
     */
    quantity?: number;
    /**
     * 逻辑删除标识（0：未删除，1：已删除）
     */
    isDelete?: number;
  }
}
export declare namespace Submit {
  export interface Request {
    /**
     * 异常id列表
     */
    ids: Array<number>;
  }
}
export declare namespace GiveUp {
  export interface Request {
    /**
     * 放弃的异常的记录子集列表id集合
     */
    receiptExceptionIdList: Array<number>;
    /**
     * 状态 0 -待处理 1-处理中 2-已处理 3-已放弃 4-已完成
     */
    status: number;
  }
}
export declare namespace Confirm {
  export interface Request {
    /**
     * id 集合
     */
    receiptExceptionIdList: Array<number>;
    /**
     * 状态 0 -待处理 1-处理中 2-已处理 3-已放弃 4-已完成
     */
    status: number;
    /**
     * 备注
     */
    remark: string;
  }
}
