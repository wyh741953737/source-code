import { Paging } from './common.d';

// 盘点结果列表
export declare namespace GetList {
  interface Data {
    /**盘点单号 */
    checkNum: string;

    /**1：初盘单，2：复盘单，2：终盘单 */
    type: number;

    /**仓库ID */
    storehouseId: string;

    /**1：明盘，2：暗盘 */
    checkType: number;

    /**1：初盘已完成，2：复盘已完成，3：终盘已完成，4：结束盘点 */
    status: number;

    /**1：未冻结，2：冻结 */
    isFrozen: number;

    /**修改人 */
    updateBy: string;

    startTime: string | undefined;
    endTime: string | undefined;
  }
  export interface Request {
    data: Data;
    /**
     * 每页条数
     */
    pageSize: number;
    /**
     * 当前页码
     */
    pageNum: number;
  }
  export type Response = Paging<{
    /**主键ID */
    id: number;

    /**盘点单号 */
    checkNum: string;

    /**1：初盘单，2：复盘单，2：终盘单 */
    type: number;

    /**仓库ID */
    storehouseId: string;

    /**仓库名称 */
    storehouseName: string;

    /**1：明盘，2：暗盘 */
    checkType: number;

    /**1：初盘已完成，2：复盘已完成，3：终盘已完成，4：结束盘点 */
    status: number;

    /**1：未冻结，2：冻结 */
    isFrozen: number;

    /**修改人 */
    updateBy: string;

    /**修改时间 */
    updateAt: string;
  }>;
}

// 判断明细
export declare namespace GetListDetail {
  export interface Request {
    /**盘点单号 */
    checkNum: string;
  }
  export type Response = Array<{
    /**主键ID */
    id: number;

    /**盘点结果主键ID */
    checkResultId: number;

    /**批次号 */
    batchNum: string;

    /**盘点编号 */
    checkNum: string;

    /**仓库id */
    storehouseId: string;

    /**SKU */
    sku: string;

    /**短码 */
    shortCode: string;

    /**变体id */
    variantId: string;

    /**图片链接 */
    image: string;

    /**1：正品，2次品 */
    type: number;

    /**盘点货人 */
    updateBy: string;

    /**盘点时间 */
    updateAt: string;

    /**货主ID */
    customerId: string;

    /**货主名称 */
    customerName: string;

    /**货主编号 */
    customerNum: string;

    /**1：初盘已盘点，2：复盘已盘点，3：终盘已盘点 */
    status: number;

    /**初盘系统数量 */
    initQuantity: number;

    /**初盘数量 */
    firstQuantity: number;

    /**复盘系统数量 */
    secondSystemQuantity: number;

    /**复盘数量 */
    secondQuantity: number;

    /**终盘系统数量 */
    lastSystemQuantity: number;

    /**终盘数量 */
    lastQuantity: number;

    /**3级库存id */
    storehouseInventoryInfoId: number;

    /**盘点批次关联变体表主键id */
    checkBatchVariantId: number;

    /**下架库位ID */
    locationId: string;

    /**库位名称 */
    locationName: string;

    /**库区 */
    areaName: string;
  }>;
}

// 盘点结果-查询盘点单异常数据

export declare namespace SearchExceptionData {
  export interface Request {
    /**盘点单号 */
    checkNum: string;
    /**操作类型 1复盘 2终盘 */
    operation: number;
  }
  export type Response = Array<{
    /**主键ID */
    id: number;

    /**盘点结果主键ID */
    checkResultId: number;

    /**盘点编号 */
    checkNum: string;

    /**SKU */
    sku: string;

    /**货主ID */
    customerId: string;

    /**货主名称 */
    customerName: string;

    /**初盘系统数量 */
    initQuantity: number;

    /**复盘系统数量 */
    secondSystemQuantity: number;

    /**初盘数量 */
    firstQuantity: number;

    /**复盘数量 */
    secondQuantity: number;
    /**库位名称 */
    locationName: string;

    /**库区 */
    areaName: string;
  }>;
}

// 盘点结果-复盘
export declare namespace Replay {
  export interface Request {
    /**盘点结果商品id */
    checkResultVariantId: Array<number>;
    /**盘点单号 */
    checkNum: string;
    /**1：明盘，2：暗盘 */
    checkType: number;
  }
  export type Response = boolean;
}

//盘点结果-终盘

export declare namespace Endplay {
  export interface Request {
    /**盘点结果商品id */
    checkResultVariantId: Array<number>;
    /**盘点单号 */
    checkNum: string;
    /**1：明盘，2：暗盘 */
    checkType: number;
  }
  export type Response = boolean;
}

// 盘点结果-终结

export declare namespace CheckEnd {
  export type Request = {
    checkNum: string;
  };
  export type Response = boolean;
}
