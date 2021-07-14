import { Paging, PagingRequest } from './common.d';
export declare namespace GetList {
  export type Request = PagingRequest<{
    /**
     * 包裹编号
     */
    packCode?: string;
    /**
     * 订单编号
     */
    orderId?: string;
    /**
     * 追踪号
     */
    trackingNumber?: string;
    /**
     * 仓库ID
     */
    storehouseId?: string;
    /**
     * 创建人名称
     */
    createBy?: string;
    /**
     * sku
     */
    variantSku?: string;
    /**
     * 1待打单2待称重3待揽收4已揽收5已撤箱6已回滚
     */
    packStatus?: number;

    /**
     * 变体短码
     */
    variantNum: string;
  }>;
}
export declare namespace ExportList {
  export type Request = {
    /**
     * 包裹编号
     */
    packCode?: string;
    /**
     * 订单编号
     */
    orderId?: string;
    /**
     * 追踪号
     */
    trackingNumber?: string;
    /**
     * 仓库ID
     */
    storehouseId?: string;
    /**
     * 创建人名称
     */
    createBy?: string;
    /**
     * sku
     */
    variantSku?: string;
    /**
     * 1待打单2待称重3待揽收4已揽收5已撤箱6已回滚
     */
    packStatus?: number;

    /**
     * 变体短码
     */
    variantNum: string;

    beginDate: string;

    endDate: string;
  };
}
export declare namespace PrintList {
  export interface Request {
    packCodeList?: Array<string>;
    ids?: Array<string>;

    // 是否校验过期时间 0否 1是
    isCheckExpireTime?: number;
  }
  export type Response = Array<{
    id: number;
    pdf: string;
    packCode: string;
    packPdf: string;
    logisticsChannel: string;
    orderId: string;
    logisticsCompany: string;
  }>;
}
