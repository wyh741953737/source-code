import { Paging, PagingRequest } from './common.d';

export declare namespace GetList {
  export type Request = PagingRequest<{
    /**
     * 调拨编号
     */
    transferCode: string;
    /**
     * 出库单号
     */
    outboundOrder: string;
    /**
     * 入库单编号
     */
    putStorageNumber: string;
    /**
     * 到达仓id
     */
    targetStorehouseId: string;
    /**
     * 转出仓id
     */
    sourceStorehouseId: string;
    /**
     * 创建人名称
     */
    createBy: string;
  }>;
  export type Response = Paging;
}
export declare namespace GetInfo {
  export interface Request {
    /**
     * 库存类型
     */
    stockType: number;
    /**
     * sku或短码
     */
    skuOrNum: string;
    /**
     * 转出仓id
     */
    sourceStorehouseId: string;
  }

  export interface Response {
    /**
     * 变体ID
     */
    variantId: string;
    /**
     * 变体sku
     */
    variantSku: string;
    /**
     * 变体短码
     */
    variantNum: string;
    /**
     * 变体图片
     */
    variantImg: string;
    /**
     * 商品属性
     */
    productProperty: string;
    /**
     * 库存类型：1.正品库存，2.残品库存
     */
    stockType: number;
    /**
     * 可用库存数
     */
    availableQuantity: number;
    /**
     * 商品重量
     */
    productWeight: number;
    /**
     * 商品状态 0-正常商品 1-服务商品 3-包装商品 4-供应商商品 5-供应商自发货商品 6-虚拟商品 7-个性商品
     */
    productType: number;
  }
}
export declare namespace ImportInfos {
  export interface Request {
    /**
     * 转出仓id
     */
    sourceStorehouseId: string;
    /**
     * 调拨属性：1.普货，2.非普货
     */
    packProperty: number;
    /**
     * 导入商品集合
     */
    list: List[];
  }

  export interface List {
    /**
     * sku/短码
     */
    skuOrNum: string;
    /**
     * 库存类型：1.正品库存，2.残品库存
     */
    stockType: number;
    /**
     * 需调拨数量
     */
    transferQuantity: number;
  }

  // 错误的商品信息
  export interface ErrorProduceInfo extends Add.ProduceInfo {
    /**
     * 错误原因
     */
    errorReason: string;
  }

  export interface Response {
    /**
     * 校验通过的商品集合
     */
    successList: Add.ProduceInfo[];
    /**
     * 校验失败的商品excel链接
     */
    errorList: ErrorProduceInfo[];
    /**
     * 成功个数
     */
    successNum: number;
    /**
     * 失败个数
     */
    errorNum: number;
  }
}
export declare namespace Cancel {
  export interface Request {
    /**
     * 调拨单主表id
     */
    id: string;
  }
}
export declare namespace Add {
  export interface Request {
    /**
     * 调拨范围：1.国内调拨，2.国外调拨
     */
    transferRange: number;
    /**
     * 转出仓id
     */
    sourceStorehouseId: string;
    /**
     * 转出仓名称
     */
    sourceStorehouseName: string;
    /**
     * 到达仓id
     */
    targetStorehouseId: string;
    /**
     * 到达仓名称
     */
    targetStorehouseName: string;
    /**
     * 调拨属性：1.普货，2.非普货
     */
    packProperty: number;
    /**
     * 备注
     */
    remark?: string;

    list: ProduceInfo[];
  }

  export interface ProduceInfo {
    /**
     * 变体ID
     */
    variantId: string;
    /**
     * 变体sku
     */
    variantSku: string;
    /**
     * 变体短码
     */
    variantNum: string;
    /**
     * 变体图片
     */
    variantImg: string;
    /**
     * 商品属性
     */
    productProperty: string;
    /**
     * 库存类型：1.正品库存，2.残品库存
     */
    stockType: number;
    /**
     * 可用库存数
     */
    availableQuantity?: number;
    /**
     * 需调拨数量
     */
    transferQuantity: number;
    /**
     * 商品重量
     */
    productWeight: number;
    /**
     * 商品状态 0-正常商品 1-服务商品 3-包装商品 4-供应商商品 5-供应商自发货商品 6-虚拟商品 7-个性商品
     */
    productType: number;
  }

  export type Response = ImportInfos.Response;
}

// 调拨单包裹详情查询
export declare namespace GetPackageDetail {
  export type Request = {
    transferCode: string;
  };

  export type Response = Array<{
    /**
     * 包裹编号
     */
    packCode?: string;
    /**
     * 包裹商品数量
     */
    packQuantity?: number;
    /**
     * 物流名称
     */
    logisticsCompany?: number;
    /**
     * 追踪号
     */
    trackingNumber?: number;
  }>;
}

// 保存包裹物流信息
export declare namespace SavePackageDetail {
  export type Request = {
    /**调包裹编号 */
    packCode: string;

    /**物流公司 */
    logisticsCompany: string;

    /**运单号 */
    trackingNumber: string;
    /**调拨出库单号 */
    transferCode: string;
  };

  export type Response = boolean;
}
