import { Paging, PagingRequest } from './common.d';
export declare namespace GetList {
  export type Request = PagingRequest<{
    /**
     * 移动单号
     */
    moveCode?: string;
    /**
     * 仓库id
     */
    storehouseId?: string;
    /**
     * 货主名称
     */
    customerName?: string;
    /**
     * 移动类型：1普通移动，2盘点移动
     */
    moveType?: number;
    /**
     * 状态：1待处理，2移动完成，3已放弃
     */
    status?: number;
    /**
     * 从库位名称
     */
    containerNum?: string;
    /**
     * 流到容器或库位名称
     */
    toContainerNum?: string;
    /**
     * 创建人名称
     */
    createBy?: string;
    /**
     * 移动人名称
     */
    updateBy?: string;
    /**
     * 创建时间开始
     */
    createAtBegin?: string;
    /**
     * 创建时间结束
     */
    createAtEnd?: string;
    /**
     * 移动时间开始
     */
    updateAtBegin?: string;
    /**
     * 移动时间结束
     */
    updateAtEnd?: string;
  }>;
  export type Response = Paging;
}
export declare namespace Submit {
  export interface Request {
    /**
     * 移动单号集合
     */
    moveCodeList: Array<string>;
  }
}
export declare namespace GiveUp {
  export interface Request {
    /**
     * 移动单号集合
     */
    moveCodeList: Array<string>;
  }
}
export declare namespace GetInventorys {
  export interface Request {
    /**
     * 仓库id
     */
    storehouseId: string;
    /**
     * sku或短码
     */
    skuOrNum?: string;
    /**
     * 库位名称
     */
    locationName?: string;
  }
}
export declare namespace VerifySKUOrNum {
  export interface Request {
    /**
     * SKU/短码
     */
    skuOrNum: string;
  }
  export interface Response {
    /**
     * 变体id
     */
    variantId?: string;
    /**
     * 变体sku
     */
    variantSku?: string;
    /**
     * 变体短码
     */
    variantNum?: string;
    /**
     * 商品id
     */
    productId?: string;
  }
}
export declare namespace VerifyTargetLocation {
  export interface Request {
    /**
     * 仓库id
     */
    storehouseId: string;
    /**
     * 库位/容器名称
     */
    locationName: string;
  }
  export interface Response {
    /**
     * 流到容器或库位id
     */
    toContainerId?: string;
    /**
     * 流到容器或库位名称
     */
    toContainerNum?: string;
    /**
     * 类型：1.库位，2.容器
     */
    toContainerType?: number;
  }
}
export declare namespace Add {
  export interface Request {
    /**
     * 库存id
     */
    id: number;
    /**
     * skuid
     */
    variantSku: string;
    /**
     * 短码
     */
    shortCode: string;
    /**
     * 仓库名称
     */
    storageName: string;
    /**
     * 流到容器或库位id
     */
    toContainerId?: string;
    /**
     * 流到容器或库位名称
     */
    toContainerNum?: string;
    /**
     * 类型：1.库位，2.容器
     */
    toContainerType?: number;
    /**
     * 移动数量
     */
    moveQuantity: number;

    /**
     * 批次号
     */
    batchNumber: string;
    /**
     * 库存批次明细id
     */
    inventoryInfoBatchId: number;

    /**指定抵扣订单 */
    orderInfo: string;
  }
}

/**推荐库位 */
export declare namespace GetRecommendedLocation {
  export type Request = {
    id: string;
  };
  export type ResponseItem = {
    /**库位id */
    id: string;

    /**库位名称 */
    name: string;

    /**库存数量 */
    quantity: string;
  };
  export type Response = {
    /**
     * 返回是否正确 true || false
     */
    success: boolean;
    /**
     * 操作结果
     */
    data: Array<ResponseItem>;
    /**
     * 返回的code
     */
    code: number;
    /**
     * 返回的错误信息说明
     */
    message: string;
  };
}
