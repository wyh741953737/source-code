import { Paging, PagingRequest } from '@/services/common.d';
export declare namespace GetList {
  export type Request = PagingRequest<{
    /**
     * 仓库id
     */
    storehouseId?: string;
    /**
     * 波次名称
     */
    waveName?: string;
    /**
     * 波次ID
     */
    id: string;
    /**
     * 波次类型：1.按商品，2.按订单，3.按客户，4.按物流，5.按时间
     */
    waveType?: number;
    /**
     * 波次状态：1.待拣货，2.拣货中，3.已完成，4.已撤销
     */
    waveStatus?: string;
  }>;
  export type Response = Paging<Record>;
  export interface Record {
    /**
     * 主键id
     */
    id?: number;
    /**
     * 波次名称
     */
    waveName?: string;
    /**
     * 波次类型：1.按商品，2.按订单，3.按客户，4.按物流，5.按时间
     */
    waveType?: number;
    /**
     * 波次状态：1.待拣货，2.拣货中，3.已完成，4.已撤销
     */
    waveStatus?: number;
    /**
     * 当前波次订单数量
     */
    orderQuantity?: number;
    /**
     * 订单数量上限
     */
    orderQuantityLimit?: number;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 创建人id
     */
    createId?: string;
    /**
     * 创建人名称
     */
    createBy?: string;
    /**
     * 创建时间
     */
    createAt?: string;
    /**
     * 更新人id
     */
    updateId?: string;
    /**
     * 更新人名称
     */
    updateBy?: string;
    /**
     * 更新时间
     */
    updateAt?: string;
    /**
     * 仓库ID
     */
    storehouseId?: string;
    /**
     * 仓库名称
     */
    storehouseName?: string;
  }
}
export declare namespace Repeal {
  export interface Request {
    /**
     * 波次id
     */
    id: string;
  }
}
export declare namespace Add {
  export interface Request {
    /**
     * 主键id
     */
    id?: number;
    /**
     * 目标仓库ID
     */
    storehouseId: string;
    /**
     * 仓库名称
     */
    storehouseName: string;
    /**
     * 波次名称
     */
    waveName: string;
    /**
     * 波次类型：1.按商品，2.按订单，3.按客户，4.按物流，5.按时间
     */
    waveType: number;
    /**
     * 订单数量上限
     */
    orderQuantityLimit: number;
    /**
     * 商品规则：1.单品，2.一单一品，3.相同sku，4.多品
     */
    commodityRules?: number;
    /**
     * 是否pod：0否，1是
     */
    whetherPod?: number;
    /**
     * 是否顶层：0.否，1.是
     */
    whetherTop?: number;
    /**
     * 订单类型：1.客户订单代发单，2.客户直发单，3.调度任务，4.退供，5.cj领料
     */
    orderType?: number;
    /**
     * 客户信息[{"id":"","name":""}]
     */
    customerInfo?: string;
    /**
     * 物流渠道信息[{"id":"","name":""}]
     */
    logisticsChannelInfo?: string;
    /**
     * 客户首发单优先处理：0.禁用，1.启用
     */
    firstOrderType?: number;
    /**
     * 按库区创建批次：库区编号，多个用逗号隔开
     */
    areaBatch?: string;
    /**
     * 是否创建为常用规则：0.否，1.是
     */
    whetherCommonRules?: number;
    /**
     * 相同sku订单数下限数
     */
    minNumber?: number;
    /**
     * 相同sku订单数上限数
     */
    maxNumber?: number;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 开始时间
     */
    completeBegin?: string;
    /**
     * 结束时间
     */
    completeEnd?: string;

    /**
     * 订单号集合
     */
    orderIdList: Array<string>;

    /**
     * 是否国内
     */
    isChina: string;

    /**
     * 母订单号
     */
    shipmentsOrderIdList: string;
  }
}
export declare namespace SearchWavePicking {
  export interface Request {
    /**
     * 仓库id
     */
    storehouseId: string;
    /**
     * 波次名称
     */
    waveName: string;
  }
  export type Response = Array<SearchData>;
  export interface SearchData {
    id: number;
    /**
     * 波次名称
     */
    waveName: string;
    /**
     * 波次类型：1.按商品，2.按订单，3.按客户，4.按物流，5.按时间
     */
    waveType: number;
    /**
     * 订单数量上限
     */
    orderQuantityLimit: number;
    /**
     * 商品规则：1.单品，2.一单一品，3.相同sku，4.多品
     */
    commodityRules?: number;
    /**
     * 是否pod：0否，1是
     */
    whetherPod?: number;
    /**
     * 是否顶层：0.否，1.是
     */
    whetherTop?: number;
    /**
     * 订单类型：1.客户订单代发单，2.客户直发单，3.调度任务，4.退供，5.cj领料
     */
    orderType?: number;
    /**
     * 客户信息[{"id":"","name":""}]
     */
    customerInfo?: string;
    /**
     * 物流渠道信息[{"id":"","name":""}]
     */
    logisticsChannelInfo?: string;
    /**
     * 客户首发单优先处理：0.禁用，1.启用
     */
    firstOrderType?: number;
    /**
     * 按库区创建批次：库区编号，多个用逗号隔开
     */
    areaBatch?: string;
    /**
     * 是否创建为常用规则：0.否，1.是
     */
    whetherCommonRules?: number;
    /**
     * 备注
     */
    remark?: string;
  }
}

export declare namespace GetWavePickingDetailList {
  export type Request = PagingRequest<{
    /**
     * 波次id
     */
    id: string;
  }>;
  export type Response = Paging;
}
