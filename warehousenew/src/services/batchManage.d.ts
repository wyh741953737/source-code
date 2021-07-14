import { Paging, PagingRequest } from '@/services/common.d';

export declare namespace GetList {
  export type Request = PagingRequest<{
    storehouseId?: string;
    /**
     * 批次id
     */
    id?: string;
    /**
     * 拣货人
     */
    zhaoHuoRen?: string;
    /**
     * 0待处理 1处理中 2已找货 3开始分单 4分单完成 5开始分货  6 分货完成 7边找边分货
     */
    status?: string;
    /**
     * 波次ID
     */
    waveId?: string;
    /**
     * 是否领单 0未 1是
     */
    claimTicketStatus?: number;

    /**
     * 订单类型 1 客户订单代发单 2 客户直发单 3 调度任务 4 退供 5 cj领料
     */
    orderType: number;
    /**
     * 是否打印 0未 1是
     */
    isCodePrint: number;
    /**
     * 创建人
     */
    creater: string;
  }>;
  export type Response = Paging<Record>;
  export interface Record {
    /**
     *  批次id
     */
    id: string;
    /**
     * 仓库
     */
    store: number;
    /**
     * 0待处理 1处理中 2已找货 3开始分单 4分单完成 5开始分货  6 分货完成 7边找边分货
     */
    status: string;
    /**
     * 订单数量
     */
    quantity: number;
    /**
     * 商品数量
     */
    productNum: number;
    /**
     * 库位数
     */
    locationNum: number;
    /**
     * 是否领单 0未 1是
     */
    claimTicketStatus: number;
    /**
     * 拣货人
     */
    zhaoHuoRen: string;
    /**
     * 波次id
     */
    waveId: number;
    /**
     * 波次名称
     */
    waveName: string;
    /**
     * 拣货人id
     */
    zhaoHuoRenId: string;
    /**
     * 拣货开始时间（领单时间）
     */
    zhaoHuoDate: string;
    /**
     * 拣货完成时间
     */
    zhaoHuoCompleteDate: string;
    /**
     * 批次条形码
     */
    codeUrl: string;
    /**
     * 批次创建时间
     */
    createDate: string;
    /**
     * 批次创建人
     */
    creater: string;

    /**
     * 订单类型
     */
    orderType: number;
    /**
     * 是否打印
     */
    isCodePrint: number;
  }
}
export declare namespace Update {
  export interface Request {
    /**
     * 仓库id
     */
    storehouseId: string;
    /**
     * 单品订单数量
     */
    singleOrderNum: number;
    /**
     * 单品商品数量
     */
    singleProductNum: number;
    /**
     * 多品订单数量
     */
    moreOrderNum: number;
    /**
     * 多品商品数量
     */
    moreProductNum: number;
    /**
     * 订单类型
     */
    orderType: number;
  }
}
export declare namespace GetSetting {
  export interface Request {
    /**
     * 仓库id
     */
    storehouseId: string;

    // 订单类型
    orderType: number;
  }
  export interface Response {
    /**
     * 单品订单数量
     */
    singleOrderNum: number;
    /**
     * 单品商品数量
     */
    singleProductNum: number;
    /**
     * 多品订单数量
     */
    moreOrderNum: number;
    /**
     * 多品商品数量
     */
    moreProductNum: number;
  }
}
export declare namespace GetDetailList {
  export type Request = PagingRequest<{
    /**
     * 批次id
     */
    id: string;
  }>;
  export type Response = Paging;
}
export declare namespace GetDetail2List {
  export type Request = PagingRequest<{
    batchId: string;
  }>;
  export type Response = Paging;
}
export declare namespace Print {
  /**
   * 需要打印的id列表
   */
  export type Request = Array<string>;
}
